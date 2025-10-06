import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { IPageProps } from "../../App";

import { getPlaylistDetails } from "../../code-files/api-calls/playlist";
import { getUser } from "../../code-files/api-calls/user";
import { getDominantColor } from '../../code-files/helpers/colorPalette';

import { IPlaylist, IUser } from "../../code-files/interfaces";

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
          getDominantColor(playlistDetails.image)
            .then((rgb) => setDominantColorRgb(rgb))
            .catch((err) => console.error("Error getting dominant color:", err));

          // fetching the profile of the playlist owner
          const userProfile: IUser | null = await getUser(accessToken, playlistDetails.owner.id);
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
            <HeaderPanel primary={{name: playlist.name, image: playlist.image, type: playlist.type}}
              secondary={{isArtist: false, name: playlist.owner.displayName, image: playlistOwner.image, id: playlistOwner.id}}
              extras={[`${playlist.tracks.total} songs`, playlist.duration]}
              dominantColorRgb={dominantColorRgb} description={playlist.description}  clickLink={clickLink}
            />

            <div className="container px-4 py-2">
              <PlayControls />
            </div>

            {/*
            <div className="container tracks-container section-container p-4 pb-1 d-flex flex-column">
              <Tracks tracks={playlist.tracks} maxTracks={playlist.tracks.total} showHead={true} showImage={true} showAlbum={true} showDate={true} clickLink={clickLink} />
            </div>
            */}
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