import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { IAccessTokenProps } from "../../assets/helpers/interfaces/propsInterfaces";

import './artistPage.css';

const ArtistPage: React.FC<IAccessTokenProps> = ({ token }) => {
  const [accessToken, setAccessToken] = useState<string | null>(token || localStorage.getItem("spotify_access_token"));
  
  useEffect(() => {
    
  }, [accessToken])
  
  return (
    <></>
  )
}

export default ArtistPage