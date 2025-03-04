import React from 'react';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IPageProps } from '../../../code-files/helpers/interfaces/propsInterfaces';
import { IPlaylistList } from '../../../code-files/helpers/interfaces/objectInterfaces';

import { getAllPublicPlaylists } from '../../../code-files/api-calls/user';

import { Playlists } from '../../../components'

import '../playlists.css';

const PlaylistGrid: React.FC<IPageProps> = ({ token, clickLink }) => {
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
      /* Must add the cardClass property to the Playlists component and the SimplePlaylist compoent to stop the responsive-card class rendering */
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