import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { IPageProps } from "../../code-files/helpers/interfaces/propsInterfaces";
import { getDominantColor } from '../../code-files/helpers/colorPalette';

import './homePage.css';

const HomePage: React.FC<IPageProps> = ({ token, clickLink }) => {
  const [accessToken, setAccessToken] = useState<string | null>(token || localStorage.getItem("spotify_access_token"));
  
  useEffect(() => {
    const fetchPageInfo = async () => {
      if (accessToken) {

      }
    }

    fetchPageInfo();
  }, [accessToken])

  return (
    <></>
  )
}

export default HomePage