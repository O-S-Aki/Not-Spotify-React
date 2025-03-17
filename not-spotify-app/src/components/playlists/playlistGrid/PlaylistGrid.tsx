import React from 'react';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getAllPublicPlaylists } from '../../../code-files/api-calls/user';

import { IPlaylistList } from '../../../code-files/interfaces';
import { Playlists } from '../../../components'

import '../playlists.css';

interface IPlaylistGridProps {
  token: string | null;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

const PlaylistGrid: React.FC<IPlaylistGridProps> = ({ token, clickLink }) => {
  const {id} = useParams();
  const [accessToken, setAccessToken] = useState<string | null>(token || localStorage.getItem("spotify_access_token"));
  const [playlists, setPlaylists] = useState<IPlaylistList | null>(null);

  useEffect(() => {
    const fetchPageInfo = async () => {
      if (accessToken && id) {
        // fetching all artists
        const playlistList: IPlaylistList | null = await getAllPublicPlaylists(accessToken, id);
        if (playlistList) {
          console.log(playlistList);
          setPlaylists(playlistList);
        }
      }
    }

    fetchPageInfo();
  }, [accessToken])

  return (
    <>
    {
      playlists ? (
        <>
          <div className="app-page">
            <div className="container playlists-container section-container px-4 d-flex flex-column">
              <h2 className="mb-4"><i onClick={(e) => clickLink(e, 'user')} className="bi-chevron-left pointer"></i></h2>
              <div className="d-flex flex-row justify-content-between">
                <h5 className="m-0 section-header">Public Playlists</h5>
              </div>
              <Playlists playlists={playlists} responsive={false} maxPlaylists={playlists.total} clickLink={clickLink} />
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

export default PlaylistGrid