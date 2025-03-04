import React from 'react';

import { useState, useEffect } from 'react';

import { IPageProps } from '../../../code-files/helpers/interfaces/propsInterfaces';
import { IArtistList } from '../../../code-files/helpers/interfaces/objectInterfaces';

import { getAllTopArtists } from '../../../code-files/api-calls/user';

import { Artists } from '../../../components'

import '../artists.css';

const ArtistsGrid: React.FC<IPageProps> = ({ token, clickLink }) => {
  const [accessToken, setAccessToken] = useState<string | null>(token || localStorage.getItem("spotify_access_token"));
  const [artists, setArtists] = useState<IArtistList | null>(null);

  useEffect(() => {
    const fetchPageInfo = async () => {
      if (accessToken) {
        // fetching all artists
        const artistList: IArtistList | null = await getAllTopArtists(accessToken);
        if (artistList) {
          setArtists(artistList);
        }
      }
    }

    fetchPageInfo();
  }, [accessToken])

  return (
    <>
    {
      artists ? (
        <>
          <div className="app-page">
            <div className="container artists-container section-container px-4 d-flex flex-column">
              <h2 className="mb-4"><i onClick={(e) => clickLink(e, 'user')} className="bi-chevron-left pointer"></i></h2>
              <h5 className="m-0 section-header">Top artists this month</h5>
              <p className="m-0 translucent-text">Only visible to you</p>
              <Artists artists={artists} responsive={false} maxArtists={artists.total} clickLink={clickLink} />
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

export default ArtistsGrid