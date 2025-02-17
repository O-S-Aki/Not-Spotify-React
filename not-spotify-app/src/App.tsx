import React from 'react';

import { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { Navbar, UserPage } from './components';

import { getUserProfile } from './assets/api-calls/user';

import './App.css';

const App = () => {
  const CLIENT_ID = "959f29fb894a4d7b834017f37700999d" as string;
  const CLIENT_SECRET = "e0c8d1c95dc845cfa9d811cb116912f5" as string;
  const REDIRECT_URI = "http://localhost:3000" as string;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize" as string;
  const RESPONSE_TYPE = "token" as string;

  const AUTH_LINK = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}` as string;

  const BASE_URL = "https://api.spotify.com/v1";

  const [token, setToken] = useState("");
  const [userProfile, setUserProfile] = useState<{ name: string, image: string | null } | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("token");

    if (!storedToken) {
      window.location.href = AUTH_LINK;
    }

    if (!storedToken && hash) {
      const params = new URLSearchParams(hash.substring(1));
      storedToken = params.get("access_token");
      window.localStorage.setItem("token", storedToken || "");
      window.location.hash = "";
    }

    if (storedToken?.startsWith("access_token=")) {
      storedToken = storedToken.replace("access_token=", "");
      window.localStorage.setItem("token", storedToken);
    }

    setToken(storedToken || "");
  }, [])

  useEffect(() => {
    const fetchUserProfile = async() => {
      if (!token) {
        return;
      }

      const profile = await getUserProfile(token);
      if (profile) {
          // console.log(profile);
      }
    }

    fetchUserProfile();
  }, [token])


  return (
    <div className="main-app">
      <header>
        <Navbar baseUrl={BASE_URL} />
      </header>

      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/user' element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
