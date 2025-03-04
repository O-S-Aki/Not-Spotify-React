import React from 'react';

import { IArtistsProps } from '../../code-files/helpers/interfaces/propsInterfaces';
import { SimpleArtist } from '../../components';

import './artists.css';

const Artists: React.FC<IArtistsProps> = ({ artists, responsive, maxArtists, clickLink }) => {
  return (
    <>
    {
      artists && maxArtists ? (
        <>
          <div className="artist-cards mt-3 row">
          {
            artists.items.slice(0, maxArtists).map((artist, index) => (
              <SimpleArtist key={index} artist={artist} responsive={responsive} clickLink={clickLink} />
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