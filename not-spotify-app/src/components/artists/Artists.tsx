import React from 'react';

import { IArtistList } from '../../code-files/interfaces';
import { SimpleArtist } from '../../components';

import './artists.css';

interface IArtistsProps {
  artists: IArtistList;
  responsive: boolean;
  maxArtists: number;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

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