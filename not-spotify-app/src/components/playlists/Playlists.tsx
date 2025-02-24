import React from 'react';
import { Link } from 'react-router-dom';

import { IPlaylistsProps } from '../../assets/helpers/interfaces/propsInterfaces';
import { SimplePlaylist } from '../../components';

import './playlists.css';

const Playlists: React.FC<IPlaylistsProps> = ({ playlists, maxPlaylists }) => {
  return (
    <>
    {
      playlists && maxPlaylists ? (
        <>
          <div className="playlist-cards mt-3 row">
          {
            playlists.items.slice(0, maxPlaylists).map((playlist, index) => (
              <SimplePlaylist key={index} playlist={playlist} />
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