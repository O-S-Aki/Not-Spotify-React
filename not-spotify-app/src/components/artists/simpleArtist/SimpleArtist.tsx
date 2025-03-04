import React from 'react';
import { ISimpleArtistProps } from '../../../code-files/helpers/interfaces/propsInterfaces';

import '../artists.css';

const SimpleArtist: React.FC<ISimpleArtistProps> = ({ artist, responsive, clickLink }) => {
  const artistURL: string = `/artist/${artist.id}`;

  return (
    <>
    {
      artist ? (
        <>
          <div onClick={(e) => clickLink(e, artistURL)} className={`artist-card${responsive ? ' responsive-card ' : ' '}col-6 col-sm-4 col-md-3 col-lg-2 p-3`}>
              <div className="artist-image-container section-image-container square-container round w-100">
                <img src={artist.image} alt={artist.name} className="w-100 h-100 square round" />
              </div>

              <div className="artist-text-container text-container">
                <h6 onClick={(e) => clickLink(e, artistURL)} className="page-link mt-3 mb-0">{artist.name}</h6>
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

export default SimpleArtist