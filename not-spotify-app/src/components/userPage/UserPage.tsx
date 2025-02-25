import React from 'react';
import { useState, useEffect } from 'react';

import { IPageProps } from '../../assets/helpers/interfaces/propsInterfaces';
import { IArtistList, IPlaylistList, ITrackList, IUser } from '../../assets/helpers/interfaces/objectInterfaces';

import { getDominantColor } from '../../assets/helpers/colorPalette';
import { getUserProfile, getTopArtists, getTopTracks, getPublicPlaylists } from '../../assets/api-calls/user';

import { Artists, Tracks, Playlists } from '../../components'

import './userPage.css';

const UserPage: React.FC<IPageProps> = ({ token, clickLink }) => {
  const [accessToken, setAccessToken] = useState<string | null>(token || localStorage.getItem("spotify_access_token"));

  const [user, setUser] = useState<IUser | null>(null);
  const [dominantColorRgb, setDominantColorRgb] = useState<string>("");

  const [topArtists, setTopArtists] = useState<IArtistList | null>(null);
  const [topTracks, setTopTracks] = useState<ITrackList | null>(null);
  const [publicPlaylists, setPublicPlaylists] = useState<IPlaylistList | null>(null);

  useEffect(() => {
    const fetchPageInfo = async () => {
      if (accessToken) {
        // fetching the user profile
        const userProfile: IUser | null = await getUserProfile(accessToken);
        if (userProfile) {
          setUser(userProfile);

          // fetching the dominant colour to use as the background
          getDominantColor(userProfile.image)
            .then((rgb) => setDominantColorRgb(rgb))
            .catch((err) => console.error("Error getting dominant color:", err));

          // fetching the user's top artists
          const artists: IArtistList | null = await getTopArtists(accessToken);
          if (artists) {
            setTopArtists(artists);
          }

          // fetching the user's top tracks
          const tracks: ITrackList | null = await getTopTracks(accessToken);
          if (tracks) {
            setTopTracks(tracks);
          }

          // fetching the user's public playlists
          const playlists: IPlaylistList | null =  await getPublicPlaylists(accessToken, userProfile.primary.id);
          if (playlists) {
            setPublicPlaylists(playlists);
          }
        }
      }
    }

    fetchPageInfo();
  }, [accessToken])

  return (
    <>
    {
      user && dominantColorRgb && topArtists && topTracks && publicPlaylists ? (
        <>
          <div className="app-page">
            <div className="container summary-container p-4 d-flex flex-row gap-3" style={{
              background: `linear-gradient(to bottom, ${dominantColorRgb}, #121212)`,
            }}>
              <div className="profile-image-container square-container round">
                <img src={user.image} alt="User profile" className='square round w-100' />
              </div>

              <div className="profile-description d-flex flex-column justify-content-center">
                <p className="translucent-text m-0">Profile</p>
                <p className="display-name mb-1">{user.primary.displayName}</p>
                <p className="m-0">
                  <span className="translucent-text">{publicPlaylists.total} Public Playlists</span>
                  <i className="bi bi-dot"></i>
                  {user.followers} Followers
                </p>
              </div>
            </div>

            <div className="container artists-container section-container mt-3 p-4 d-flex flex-column">
              <h5 className="m-0 section-header">Top artists this month</h5>
              <div className="d-flex flex-row justify-content-between">
                <p className="m-0 translucent-text">Only visible to you</p>
                <p className="m-0 translucent-text"><strong>Show all</strong></p>
              </div>
              <Artists artists={topArtists} maxArtists={6} clickLink={clickLink} />
            </div>

            <div className="container tracks-container section-container mt-3 p-4 d-flex flex-column">
              <h5 className="m-0 section-header">Top tracks this month</h5>
              <div className="d-flex flex-row justify-content-between">
                <p className="m-0 translucent-text">Only visible to you</p>
                <p className="m-0 translucent-text"><strong>Show all</strong></p>
              </div>
              <div className="mt-3">
                <Tracks tracks={topTracks} maxTracks={5} showHead={false} showImage={true} showAlbum={true} showDate={false} clickLink={clickLink} />
              </div>
            </div>

            <div className="container playlists-container section-container mt-3 p-4 d-flex flex-column">
              <div className="d-flex flex-row justify-content-between">
                <h5 className="m-0 section-header">Public Playlists</h5>
                <p className="m-0 translucent-text"><strong>Show all</strong></p>
              </div>
              <Playlists playlists={publicPlaylists} maxPlaylists={6} clickLink={clickLink} />
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

export default UserPage