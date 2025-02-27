import React from 'react';
import { ITracksHeadProps } from '../../../assets/helpers/interfaces/propsInterfaces';

import '../tracks.css';

const TracksHead: React.FC<ITracksHeadProps> = ({ showAlbum, showDate }) => {
  return (
    <>
      <thead>
        <tr>

          <th className="align-middle">
            <div className="d-flex flex-row gap-3 align-middle">
              <p className="m-0 translucent-text track-number text-end">#</p>
              <p className="m-0 translucent-text">Title</p>
            </div>
          </th>
          
          {
            showAlbum ? (
              <>
                <th className="align-middle show-album">
                  <p className="m-0 translucent-text">Album</p>
                </th>
              </>
            ) : (
              <></>
            )
          }

          {
            showDate ? (
              <>
                <th className="align-middle show-date">
                  <p className="m-0 translucent-text">Date Added</p>
                </th>
              </>
            ) : (
              <></>
            )
          }

          <th className="align-middle d-flex flex-row justify-content-end">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="d-flex flex-row gap-3 align-items-center">
                <p className="m-0 translucent-text"><i className="bi bi-clock"></i></p>
                <i className="bi bi-three-dots table-dots"></i>
              </div>
            </div>
          </th>
          
        </tr>
      </thead>
    </>
  )
}

export default TracksHead