import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { IPageProps } from "../../code-files/helpers/interfaces/propsInterfaces";

import { getAlbumDetails } from "../../code-files/api-calls/album";
import { getArtistProfile, getFullDiscography } from "../../code-files/api-calls/artist";
import { getDominantColor } from '../../code-files/helpers/colorPalette';

import { IAlbum, IAlbumList, IArtist } from "../../code-files/helpers/interfaces/objectInterfaces";

import { Albums, HeaderPanel, PlayControls, Tracks } from '../../components';

import './albumPage.css';

const AlbumPage: React.FC<IPageProps> = ({ token, clickLink }) => {
  const {id} = useParams();
  const accessToken = token || localStorage.getItem("spotify_access_token");

  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [leadArtist, setLeadArtist] = useState<IArtist | null>(null);
  const [dominantColorRgb, setDominantColorRgb] = useState<string>("");

  const [discography, setDiscography] = useState<IAlbumList | null>(null);
  
  useEffect(() => {
    const fetchPageInfo = async () => {
      if (accessToken && id) {
        const albumDetails: IAlbum | null = await getAlbumDetails(accessToken, id);
        if (albumDetails) {
          setAlbum(albumDetails);

          // fetching the dominant colour to use as the background
          getDominantColor(albumDetails.primary.image)
            .then((rgb) => setDominantColorRgb(rgb))
            .catch((err) => console.error("Error getting dominant color:", err));

          // getting the lead artist of the album
          const artist: IArtist | null = await getArtistProfile(accessToken, albumDetails.artists.items[0].id);
          if (artist) {
            setLeadArtist(artist);

            // fetching the lead artist's popular releases
            const artistDiscography = await getFullDiscography(accessToken, artist.primary.id);
            if (artistDiscography) {
              setDiscography(artistDiscography);
            }
          }
        }
      }
    }

    fetchPageInfo();
  }, [accessToken, id])

  return (
    <>
    {
      album && dominantColorRgb && leadArtist && discography ? (
        <>
          <div className="app-page">

            <HeaderPanel primary={{name: album.primary.name, image: album.primary.image, type: album.primary.type}}
              secondary={{isArtist: true, name: leadArtist.primary.name, image: leadArtist.primary.image, id: leadArtist.primary.id}}
              extras={[album.primary.releaseYear, `${album.tracks.total} songs`, album.duration]}
              dominantColorRgb={dominantColorRgb} description={null} clickLink={clickLink}
            />

            <div className="container section-container px-4 py-2">
              <PlayControls />
            </div>

            <div className="container tracks-container section-container px-4 py-2 pb-1 d-flex flex-column">
              <Tracks tracks={album.tracks} maxTracks={album.tracks.total} showHead={true} showImage={false} showAlbum={false} showDate={false} clickLink={clickLink} />
            </div>

            <div className="container section-container px-4 py-1">
              <p className="translucent-text m-0">{album.copyright}</p>
            </div>

            <div className="container section-container mt-3 p-4 d-flex flex-column">
              <h5 className="m-0 section-header">More by {leadArtist.primary.name}</h5>
              <div className="mt-3">
                <Albums albums={discography} maxAlbums={6} clickLink={clickLink} />
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

export default AlbumPage