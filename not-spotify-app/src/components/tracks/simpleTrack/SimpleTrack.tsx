import React from 'react';
import { ISimpleTrackProps } from '../../../assets/helpers/interfaces/propsInterfaces';

import '../tracks.css';

const SimpleTrack: React.FC<ISimpleTrackProps> = ({ track, index, showImage, showAlbum, showDate, clickLink }) => {    
  return (
    <>
    {
      track ? (
        <>
          <tr>

            <td className="align-middle">
              <div className="d-flex flex-row gap-3 align-items-center">
                <p className="m-0 translucent-text text-end track-number">{index}</p>

                {
                  showImage ? (
                    <>
                      <div className="track-image-container section-image-container">
                        <img src={track.image} alt={track.name} className='h-100' />
                      </div>
                    </>
                  ) : (
                    <></>
                  )
                }

                <div>
                  <h6 className="m-0 page-link">{track.name}</h6>
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
                  <td className="align-middle">
                    <p className="m-0 translucent-text page-link">{track.album.name}</p>
                  </td>
                </>
              ) : (
                <></>
              )
            }

            {
              showDate ? (
                <>
                  <td className="align-middle">
                    
                  </td>
                </>
              ) : (
                <></>
              )
            }

            <td className="align-middle">
              <div className="d-flex flex-row gap-3 align-items-center justify-content-end">
                <p className="m-0 translucent-text">{track.duration}</p>
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