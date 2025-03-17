import React from 'react';

import './popularity.css';

interface IPopularityProps {
  score: number;
}

const Popularity: React.FC<IPopularityProps> = ({ score }) => {
  const convertScoreToStars = (score: number): number => {
    return Math.floor(score / 10) * 0.5 + 0.5;
  };

  const stars = convertScoreToStars(score);

  const filledStars = Math.floor(stars);
  const halfStar = filledStars < 5 && stars % 2 === 1;
  const emptyStars = 5 - (filledStars + (halfStar ? 1 : 0));

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
