import React from 'react';
import { IPopularityProps } from '../../assets/helpers/interfaces/propsInterfaces';

import './popularity.css';

const Popularity: React.FC<IPopularityProps> = ({ score }) => {
  const filledStars = Math.floor(score / 10);
  const halfStar = score % 10 >= 5 ? true : false;
  const emptyStars = 10 - (filledStars + (halfStar ? 1 : 0));

  return (
    <>
      <h5>
        {
          [...Array(filledStars)].map((_, index) => (
            <i key={`full-star-${index}`} className='bi bi-star-fill popularity-star'></i>
          ))
        }

        {
          halfStar ? (
            <i key={`half-star`} className='bi bi-star-half popularity-star'></i>
          ) : <></>
        }

        {
          [...Array(emptyStars)].map((_, index) => (
            <i key={`empty-star-${index}`} className='bi bi-star popularity-star'></i>
          ))
        }
      </h5>
    </>
  )
}

export default Popularity
