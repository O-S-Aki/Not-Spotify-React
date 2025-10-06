import React from 'react';

import { ISimpleTrack } from '../../../code-files/interfaces';

import { saveTracksToLiked } from '../../../code-files/api-calls/track';

import '../tracks.css';

interface ISimpleTrackProps {
  track: ISimpleTrack;
  index: number;
  showImage: boolean;
  showAlbum: boolean; 
  showDate: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onToggleLike: (trackId: string, isCurrentlyLiked: boolean) => void;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

const SimpleTrack: React.FC<ISimpleTrackProps> = ({ track, index, showImage, showAlbum, showDate, isSelected, onSelect, onToggleLike, clickLink }) => {    
  const trackURL: string = `/track/${track.id}`;
  const albumURL: string = `/album/${track.album.id}`;

  return (
    <>
    {
      track ? (
        <>
          <tr className={`simple-track-row ${isSelected ? "selected" : ""}`} onClick={onSelect}>

            <td className="align-middle">
              <div className="d-flex flex-row gap-3 align-items-center">
                <p className="m-0 translucent-text text-end track-number">{index}</p>

                {
                  showImage ? (
                    <>
                      <div className="track-image-container section-image-container square-container">
                        <img src={track.image} alt={track.name} className='h-100 w-100 square' />
                      </div>
                    </>
                  ) : (
                    <></>
                  )
                }

                <div>
                  <h6 onClick={(e) => clickLink(e, trackURL)} className="m-0 page-link">{track.name}</h6>
                  <p className="m-0 translucent-text">
                    {
                      track.isExplicit ? (
                        <>
                          <i className="bi bi-explicit-fill m-1"></i>
                        </>
                      ) : (
                        <></>
                      )
                    }

                    {
                      track.artists.items.map((artist, i) => (
                        <React.Fragment key={i}>
                          <span onClick={(e) => clickLink(e, `/artist/${artist.id}`)} key={i} className="d-inline page-link">
                            {artist.name}
                          </span>
                          {i < track.artists.total - 1 ? ", " : ""}
                        </React.Fragment>
                      ))
                    }
                  </p>
                </div>
              </div>
            </td>

            {
              showAlbum ? (
                <>
                  <td className="align-middle show-album">
                    <div className="d-flex flex-row gap-3 align-items-center">
                      <p onClick={(e) => clickLink(e, albumURL)} className="m-0 translucent-text page-link">{track.album.name}</p>
                    </div>
                  </td>
                </>
              ) : (
                <></>
              )
            }

            {
              showDate ? (
                <>
                  <td className="align-middle show-date min-width">
                    <p className="m-0 translucent-text">{track.addedAt}</p>
                  </td>
                </>
              ) : (
                <></>
              )
            }

            <td className="align-middle">
              <div className="d-flex flex-row gap-3 align-items-center justify-content-end">
                {
                  track.liked ? (
                    <>
                      <i className="track-like-indicator bi bi-heart-fill liked" onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike?.(track.id, track.liked);
                      }}></i>
                    </>
                  ) : (
                    <>
                      <i className="track-like-indicator bi bi-heart not-liked" onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike?.(track.id, track.liked);
                      }}></i>
                    </>
                  )
                }
              </div>
            </td>

            <td className="align-middle">
              <div className="d-flex flex-row gap-3 align-items-center justify-content-end">
                <p className="m-0 translucent-text track-duration">{track.duration}</p>
                <i className="bi bi-three-dots table-dots"></i>
              </div>
            </td>

          </tr>
        </>
      ) : (
        <></>
      )
    }
    </>
  )
}

export default SimpleTrack