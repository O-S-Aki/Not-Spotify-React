import React from 'react';
import axios from "axios";

import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { Navbar, UserPage, HomePage } from './components';

import { getCredentials, getAuthUrl } from './assets/api-calls/authenticator';

import { getUserProfile } from './assets/api-calls/user';

import './App.css';

const App = () => {
  const spotify = getCredentials();
  const authUrl = getAuthUrl();

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
      console.log(`retrieved token: ${token}`);

      setAccessToken(token);
      localStorage.setItem("spotify_access_token", token);
      window.history.pushState({}, "", "/");
    }
    else {
      console.log(`stored token: ${localStorage.getItem("spotify_access_token")}`)

      setAccessToken(localStorage.getItem("spotify_access_token"))
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      const fetchUserProfile = async () => {
        const fetchedUser = await getUserProfile(accessToken);

        if (fetchedUser) {
          setUser(fetchedUser);
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

  return (
    <div className="app d-flex flex-column">

      <header>
        <Navbar accessToken={accessToken} authUrl={authUrl} user={user} logout={logout} />
      </header>

      <div className="main">        
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />

          <Route path='/user'>
            <Route index element={<UserPage accessToken={accessToken} user={user} />} />
            <Route path='profile' element={<UserPage accessToken={accessToken} user={user} />} />
          </Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;
