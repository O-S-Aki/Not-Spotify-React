import React from 'react';
import { ISimplePlaylistProps } from '../../../assets/helpers/interfaces/propsInterfaces';

import '../playlists.css';

const SimplePlaylist: React.FC<ISimplePlaylistProps> = ({ playlist, clickLink }) => {
  const playlistURL: string = `/playlist/${playlist.id}`;

  return (
    <>
    {
      playlist ? (
        <>
          <div onClick={(e) => clickLink(e, playlistURL)} className="playlist-card responsive-card col-6 col-sm-4 col-md-3 col-lg-2 p-2">
            <div className="playlist-image-container w-100 p-1 square-container">
              <img src={playlist.image} alt={playlist.name} className="w-100 h-100 square" />
            </div>

            <div className="playlists-text-container text-container">
              <h6 onClick={(e) => clickLink(e, playlistURL)} className="page-link mt-3 mb-0">{playlist.name}</h6>
              <p className="translucent-text mb-0">By <span className="page-link d-inline">{playlist.owner.displayName}</span></p>
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

export default SimplePlaylist