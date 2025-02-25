import React from 'react';

import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { Navbar, UserPage, HomePage, ArtistPage } from './components';

import { getCredentials, getAuthUrl } from './assets/helpers/authenticator';
import { getUserProfile } from './assets/api-calls/user';
import { IUser } from './assets/helpers/interfaces/objectInterfaces';

import './App.css';

const App = () => {
  const spotify = getCredentials();
  const authUrl = getAuthUrl();
  const navigate = useNavigate();

  // hook for getting and setting the access token.
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // hook for getting and setting the currently logged in user.
  const [user, setUser] = useState<any>(null);

  /* -------------------- 
  GETTING THE ACCESS TOKEN FROM SPOIFY
  -------------------- */
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const token = params.get("access_token");

    if (token) {
      setAccessToken(token);
      localStorage.setItem("spotify_access_token", token);
      window.history.pushState({}, "", "/");
    }
    else {
      setAccessToken(localStorage.getItem("spotify_access_token"))
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      const fetchUserProfile = async () => {
        const userProfile: IUser | null = await getUserProfile(accessToken!);
        if (userProfile) {
          setUser(userProfile);
        }
      }
      
      fetchUserProfile();
    }
  }, [accessToken])

  const logout = () => {
    console.log('logged out');
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("spotify_access_token");
  };

  const clickLink = (event: React.MouseEvent, url: string) => {
    event.stopPropagation();
    navigate(url);
  }

  return (
    <div className="app d-flex flex-column">

      <header>
        <Navbar token={accessToken} authUrl={authUrl} user={user} logout={logout} />
      </header>

      <div className="main">        
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />

          <Route path='/user'>
            <Route index element={<UserPage token={accessToken} clickLink={clickLink} />} />
            <Route path='profile' element={<UserPage token={accessToken} clickLink={clickLink} />} />
          </Route>

          <Route path='/artist'>
            <Route path=':id' element={<ArtistPage token={accessToken} clickLink={clickLink} />} />
          </Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;
