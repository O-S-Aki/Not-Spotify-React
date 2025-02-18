import React from 'react';
import axios from "axios";

import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { Navbar, UserPage } from './components';

import { getCredentials, getAuthUrl } from './assets/api-calls/authenticator';

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
      axios.get(`${spotify.BaseUrl}/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      })
      .then((userResponse) => {
        console.log(userResponse.data);
        setUser(userResponse.data);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err)
      });
    }
  }, [accessToken])

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("spotify_access_token");
  };

  return (
    <div className="app d-flex flex-column">

      <header>
        <Navbar accessToken={accessToken} authUrl={authUrl} logout={logout} user={user} />
      </header>

      <div className="main">        
        <Routes>
          <Route path='/' element={<UserPage />} />
          <Route path='/user' element={<UserPage />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
