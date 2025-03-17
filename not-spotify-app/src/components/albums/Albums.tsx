import React from 'react';
import { IAlbumList } from '../../code-files/interfaces/';
import { SimpleAlbum } from '../../components';

import './albums.css';

interface IAlbumsProps {
  albums: IAlbumList;
  maxAlbums: number;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

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