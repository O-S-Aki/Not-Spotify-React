import React from 'react';
import { IPlaylistList } from '../../code-files/interfaces/';
import { SimplePlaylist } from '../../components';

import './playlists.css';

interface IPlaylistsProps {
  playlists: IPlaylistList;
  responsive: boolean;
  maxPlaylists: number;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

const Playlists: React.FC<IPlaylistsProps> = ({ playlists, responsive, maxPlaylists, clickLink }) => {
  return (
    <>
    {
      playlists && maxPlaylists ? (
        <>
          <div className="playlist-cards mt-3 row">
          {
            playlists.items.slice(0, maxPlaylists).map((playlist, index) => (
              <SimplePlaylist key={index} responsive={responsive} playlist={playlist} clickLink={clickLink} />
            ))
          }
          </div>
        </>
      ) : (
        <></>
      )
    }
    </>
  )
}

export default Playlists