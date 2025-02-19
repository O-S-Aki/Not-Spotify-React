import React from 'react';
import { Link } from 'react-router-dom';

import { ISimpleArtistProps } from '../../../assets/helpers/interfaces/propsInterfaces';

import '../artists.css';

const Artists: React.FC<ISimpleArtistProps> = ({ artist }) => {
  return (
    <>
    {
      artist ? (
        <>
          <div className="artist-card responsive-card col-6 col-sm-4 col-md-3 col-lg-2 p-3">
            <div className="artist-image-container section-image-container square-container round w-100">
              <img src={artist.image} alt={artist.name} className="w-100 h-100 square round" />
            </div>

            <div className="artist-text-container text-container">
              <h6 className="page-link mt-3 mb-0">{artist.name}</h6>
              <p className="translucent-text mb-0">{artist.type}</p>
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

export default Artists