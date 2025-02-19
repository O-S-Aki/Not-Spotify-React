import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { IAccessTokenProps } from '../../assets/helpers/interfaces/propsInterfaces';
import { IArtistList, ITrackList, IUserProfile } from '../../assets/helpers/interfaces/interfaces';

import { getDominantColor } from '../../assets/helpers/colorPalette';
import { getUserProfile, getTopArtists, getTopTracks } from '../../assets/api-calls/user';

import { Artists } from '../../components'

import './userPage.css';

const UserPage: React.FC<IAccessTokenProps> = ({ accessToken }) => {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [dominantColorRgb, setDominantColorRgb] = useState<string>("");

  const [topArtists, setTopArtists] = useState<IArtistList | null>(null);
  const [topTracks, setTopTracks] = useState<ITrackList | null>(null);
  const [publicPlaylists, setPublicPlaylists] = useState<any>([]);

  useEffect(() => {
  // persisting the access token if the page reloads
    if (!accessToken) {
      accessToken = (localStorage.getItem("spotify_access_token"));
    }
    
    const fetchPageInfo = async () => {
      // fetching the user profile
      const userProfile: IUserProfile | null = await getUserProfile(accessToken!);
        if (userProfile) {
          setUser(userProfile);

          // fetching the dominant colour to use as the background
          getDominantColor(userProfile.image)
            .then((rgb) => setDominantColorRgb(rgb))
            .catch((err) => console.error("Error getting dominant color:", err));

          // fetching the user's top artists
          const artists: IArtistList | null = await getTopArtists(accessToken!);
          if (artists) {
            setTopArtists(artists);
          }

          // fetching the user's top tracks
          await getTopTracks(accessToken!);
        }
    }

    fetchPageInfo();
  }, [accessToken])

  return (
    <>
    {
      user && dominantColorRgb && topArtists ? (
        <>
          <div className="container summary-container p-4 d-flex flex-row gap-3" style={{
            background: `linear-gradient(to bottom, ${dominantColorRgb}, #121212)`,
          }}>
            <div className="profile-image-container square-container round">
              <img src={user.image} alt="User profile" className='square round w-100' />
            </div>

            <div className="profile-description d-flex flex-column justify-content-center">
              <p className="translucent-text m-0">Profile</p>
              <p className="display-name mb-1">{user.displayName}</p>
              <p className="m-0">
                <span className="translucent-text">{0} Public Playlists</span>
                <i className="bi bi-dot"></i>
                {user.followers} Followers
              </p>
            </div>
          </div>

          <div className="container top-artists-container section-container mt-3 p-4 d-flex flex-column">
            <h5 className="m-0 section-header">Top artists this month</h5>
            <div className="d-flex flex-row justify-content-between">
              <p className="m-0 translucent-text">Only visible to you</p>
              <p className="m-0 translucent-text"><strong>Show all</strong></p>
            </div>
            <Artists artists={topArtists} maxArtists={6} />
          </div>
        </>
      ) : (
        <></>
      )
    }
    </>
  )
}

export default UserPage