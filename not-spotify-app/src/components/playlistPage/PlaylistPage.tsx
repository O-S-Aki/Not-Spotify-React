import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { IPageProps } from "../../assets/helpers/interfaces/propsInterfaces";

import { getPlaylistDetails } from "../../assets/api-calls/playlist";
import { getUser } from "../../assets/api-calls/user";
import { getDominantColor } from '../../assets/helpers/colorPalette';

import { IPlaylist, IUser } from "../../assets/helpers/interfaces/objectInterfaces";

import { HeaderPanel, PlayControls, Tracks } from '../../components';

import './playlistPage.css';

const PlaylistPage: React.FC<IPageProps> = ({ token, clickLink }) => {
  const {id} = useParams();
  const accessToken = token || localStorage.getItem("spotify_access_token");

  const [playlist, setPlaylist] = useState<IPlaylist | null>(null);
  const [playlistOwner, setPlaylistOwner] = useState<IUser | null>(null);
  const [dominantColorRgb, setDominantColorRgb] = useState<string>("");
  
  useEffect(() => {
    const fetchPageInfo = async () => {
      if (accessToken && id) {
        const playlistDetails: IPlaylist | null = await getPlaylistDetails(accessToken, id);
        if (playlistDetails) {
          setPlaylist(playlistDetails);

          // fetching the dominant colour to use as the background
          getDominantColor(playlistDetails.primary.image)
            .then((rgb) => setDominantColorRgb(rgb))
            .catch((err) => console.error("Error getting dominant color:", err));

          // fetching the profile of the playlist owner
          const userProfile: IUser | null = await getUser(accessToken, playlistDetails.primary.owner.id);
          if (userProfile) {
            setPlaylistOwner(userProfile);
          }
        }
      }
    }

    fetchPageInfo();
  }, [accessToken, id])

  return (
    <>
    {
      playlist && dominantColorRgb && playlistOwner ? (
        <>
          <div className="app-page">
            <HeaderPanel primary={{name: playlist.primary.name, image: playlist.primary.image, type: playlist.primary.type}}
              secondary={{isArtist: false, name: playlist.primary.owner.displayName, image: playlistOwner.image, id: playlistOwner.primary.id}}
              extras={[`${playlist.tracks.total} songs`, playlist.duration]}
              dominantColorRgb={dominantColorRgb} description={playlist.description}  clickLink={clickLink}
            />

            <div className="container px-4 py-2">
              <PlayControls />
            </div>

            <div className="container tracks-container section-container p-4 pb-1 d-flex flex-column">
              <Tracks tracks={playlist.tracks} maxTracks={playlist.tracks.total} showHead={true} showImage={true} showAlbum={true} showDate={true} clickLink={clickLink} />
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

export default PlaylistPage