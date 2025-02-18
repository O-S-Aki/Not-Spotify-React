import React from 'react';

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './userPage.css';

interface UserPageProps {
  accessToken: string | null;
  user: any;
}

interface User {
  id: number;
  displayName: string;
  followers: any;
  image: string;
  type: string;
}

const UserPage: React.FC<UserPageProps> = ({ accessToken, user }) => {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  if (!accessToken || !user) {
    return null;
  }

  const userProfile: User = {
    id: user.id,
    displayName: user.display_name,
    followers: user.followers.total || 0,
    image: user.images[0].url || "",
    type: user.type[0].toUpperCase() + user.type.slice(1),
  };

  return (
    <>
    {
      userProfile ? (
        <>
          <p>{userProfile.displayName}</p>
        </>
      ) : (
        <></>
      )
    }
    </>
  )
}

export default UserPage