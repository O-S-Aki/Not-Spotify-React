import React from 'react';

import { ITrackList } from '../../code-files/interfaces/';
import { TracksHead, SimpleTrack } from '../../components';

import './tracks.css';

interface ITracksProps {
  tracks: ITrackList;
  maxTracks: number;
  showHead: boolean;
  showImage: boolean;
  showAlbum: boolean; 
  showDate: boolean;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

const Tracks: React.FC<ITracksProps> = ({ tracks, maxTracks, showHead, showImage, showAlbum, showDate, clickLink }) => {
  return (
    <>
    {
      tracks && maxTracks ? (
        <>
          <div className="table-responsive">
            <table className="table tracks-table">
              {
                showHead ? (
                  <>
                    <TracksHead showAlbum={showAlbum} showDate={showDate} />
                  </>
                ) : (
                  <></>
                )
              }
              <tbody>
                {
                  tracks.items.slice(0, maxTracks).map((track, index) => (
                    <SimpleTrack key={index} track={track} index={index + 1} showImage={showImage} showAlbum={showAlbum} showDate={showDate} clickLink={clickLink} />
                  ))
                }
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <></>
      )
    }
    </>
  )
}

export default Tracks