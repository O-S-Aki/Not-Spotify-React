import React from 'react';
import { Link } from 'react-router-dom';

import { IArtistsProps } from '../../assets/helpers/interfaces/propsInterfaces';
import { SimpleArtist } from '../../components';

import './artists.css';

const Artists: React.FC<IArtistsProps> = ({ artists, cardClass, maxArtists, clickLink }) => {
  return (
    <>
    {
      artists && maxArtists ? (
        <>
          <div className="artist-cards mt-3 row">
          {
            artists.items.slice(0, maxArtists).map((artist, index) => (
              <SimpleArtist key={index} artist={artist} cardClass={cardClass} clickLink={clickLink} />
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

export default Artists