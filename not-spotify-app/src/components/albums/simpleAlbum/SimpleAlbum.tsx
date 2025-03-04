import React from 'react';
import { ISimpleAlbumProps } from '../../../code-files/helpers/interfaces/propsInterfaces';

import '../albums.css';

const SimpleAlbum: React.FC<ISimpleAlbumProps> = ({ album, clickLink }) => {
  const albumUrl: string = `/album/${album.id}`

  return (
    <>
    {
      album ? (
        <>
          <div onClick={(e) => clickLink(e, albumUrl)} className="album-card responsive-card col-6 col-sm-4 col-md-3 col-lg-2 p-2">
            <div className="album-image-container w-100 p-1 square-container">
              <img src={album.image} alt={album.name} className="w-100 h-100 square" />
            </div>

            <div className="album-text-container text-container">
              <h6 onClick={(e) => clickLink(e, albumUrl)} className="page-link mt-3 mb-0">{album.name}</h6>
              <p className="translucent-text mb-0">
                {album.releaseYear}
                <i className="bi bi-dot"></i>
                {album.type}
              </p>
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

export default SimpleAlbum