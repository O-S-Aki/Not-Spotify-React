import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { IArtistPageProps } from "../../assets/helpers/interfaces/propsInterfaces";

import './artistPage.css';

const ArtistPage: React.FC<IArtistPageProps> = ({ accessToken }) => {
  useEffect(() => {
    // persisting the access token if the page reloads
    if (!accessToken) {
      accessToken = (localStorage.getItem("spotify_access_token"));
    }

  }, [accessToken])
  
  return (
    <></>
  )
}

export default ArtistPage