import React from 'react';
import { IAlbumsProps } from '../../assets/helpers/interfaces/propsInterfaces';
import { SimpleAlbum } from '../../components';

import './albums.css';

const Albums: React.FC<IAlbumsProps> = ({ albums, maxAlbums, clickLink }) => {
  return (
    <>
    {
      albums && maxAlbums ? (
        <>
          <div className="album-cards row">
          {
            albums.items.slice(0, maxAlbums).map((album, index) => (
              <SimpleAlbum key={index} album={album} clickLink={clickLink} />
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

export default Albums