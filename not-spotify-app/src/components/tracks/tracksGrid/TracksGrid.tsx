import React from 'react';

import { useState, useEffect } from 'react';

import { IPageProps } from '../../../assets/helpers/interfaces/propsInterfaces';
import { ITrackList } from '../../../assets/helpers/interfaces/objectInterfaces';

import { getAllTopTracks } from '../../../assets/api-calls/user';

import { Tracks } from '../../../components'

import '../tracks.css';

const TracksGrid: React.FC<IPageProps> = ({ token, clickLink }) => {
  const [accessToken, setAccessToken] = useState<string | null>(token || localStorage.getItem("spotify_access_token"));
  const [tracks, setTracks] = useState<ITrackList | null>(null);

  useEffect(() => {
    const fetchPageInfo = async () => {
      if (accessToken) {
        // fetching all tracks
        const trackList: ITrackList | null = await getAllTopTracks(accessToken);
        if (trackList) {
          setTracks(trackList);
        }
      }
    }

    fetchPageInfo();
  }, [accessToken])

  return (
    <>
    {
      tracks ? (
        <>

          <div className="app-page">
            <div className="container tracks-container section-container px-4 d-flex flex-column">
              <h2 className="mb-4"><i onClick={(e) => clickLink(e, 'user')} className="bi-chevron-left pointer"></i></h2>
              <h5 className="m-0 section-header">Top tracks this month</h5>
              <p className="m-0 translucent-text">Only visible to you</p>
              <div className="mt-3">
                <Tracks tracks={tracks} maxTracks={tracks.total} showHead={false} showImage={true} showAlbum={true} showDate={false} clickLink={clickLink} />
              </div>
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

export default TracksGrid