import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { IPageProps } from "../../App";

import { getTrackDetails } from "../../code-files/api-calls/track";
import { getArtistProfile, getFullDiscography, getPopularTracks } from "../../code-files/api-calls/artist";
import { getDominantColor } from '../../code-files/helpers/colorPalette';

import { ITrack, IArtist, IAlbumList, ITrackList } from "../../code-files/interfaces/";
import { Albums, HeaderPanel, PlayControls, Tracks } from '../../components';

import './trackPage.css';
import { useTrackLike } from "../../code-files/custom-hooks/useTrackLike";

const TrackPage: React.FC<IPageProps> = ({ token, clickLink }) => {
  const {id} = useParams();
  const accessToken = token || localStorage.getItem("spotify_access_token");

  const [track, setTrack] = useState<ITrack | null>(null);
  const [leadArtist, setLeadArtist] = useState<IArtist | null>(null);

  const [popularTracks, setPopularTracks] = useState<ITrackList | null>(null);
  const [popularReleases, setPopularReleases] = useState<IAlbumList | null>(null);

  const [dominantColorRgb, setDominantColorRgb] = useState<string>("");
  
  useEffect(() => {
    const fetchPageInfo = async () => {
      if (accessToken && id) {
        const trackDetails: ITrack | null = await getTrackDetails(accessToken, id);
        if (trackDetails) {
          setTrack(trackDetails);

          // fetching the dominant colour to use as the background
          getDominantColor(trackDetails.image)
            .then((rgb) => setDominantColorRgb(rgb))
            .catch((err) => console.error("Error getting dominant color:", err));
          
          // getting the lead artist of the album
          const artist: IArtist | null = await getArtistProfile(accessToken, trackDetails.artists.items[0].id);
          if (artist) {
            setLeadArtist(artist);

            // fetching the lead artist's popular tracks
            const artistTracks = await getPopularTracks(accessToken, artist.id);
            if (artistTracks) {
              setPopularTracks(artistTracks);
            }
            
            // fetching the lead artist's popular releases
            const artistDiscography = await getFullDiscography(accessToken, artist.id);
            if (artistDiscography) {
              setPopularReleases(artistDiscography);
            }
          }
        }
      }
    }

    fetchPageInfo();
  }, [accessToken, id])

  const { handleToggleLike } = useTrackLike(accessToken, setPopularTracks);
  const { handleSingleToggleLike } = useTrackLike(accessToken, undefined, setTrack);

  return (
    <>
    {
      track && dominantColorRgb && leadArtist && popularTracks && popularReleases ? (
        <>
          <div className="app-page">
            <HeaderPanel primary={{name: track.name, image: track.image, type: track.type}}
              secondary={{isArtist: true, name: leadArtist.name, image: leadArtist.image, id: leadArtist.id}}
              extras={[track.album.name, track.album.releaseYear, track.duration]}
              dominantColorRgb={dominantColorRgb} description={null} clickLink={clickLink}
            />

            <div className="container section-container px-4 py-2">
              <PlayControls isTrack={true} trackId={track.id} liked={track.liked} onToggleLike={handleSingleToggleLike} />
            </div>

            <div className="container section-container px-4 py-2 d-flex flex-column">
              <p className="m-0 translucent-text">Popular Tracks by</p>
              <h5 className="m-0 section-header">{leadArtist.name}</h5>
              <div className="mt-3">
                <Tracks tracks={popularTracks} maxTracks={5} showHead={false} showImage={true} showAlbum={true} showDate={false} onToggleLike={handleToggleLike} clickLink={clickLink}/>
              </div>
            </div>
            
            <div className="container section-container p-4 d-flex flex-column">
              <p className="m-0 translucent-text">Popular Releases by</p>
              <h5 className="m-0 section-header">{leadArtist.name}</h5>
              <div className="mt-3">
                <Albums albums={popularReleases} maxAlbums={6} clickLink={clickLink} />
              </div>
            </div>

          </div>
        </>
      ) : (
        <></>
      )
    }
    </>
  )
}

export default TrackPage