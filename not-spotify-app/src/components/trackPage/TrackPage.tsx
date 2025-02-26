import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { IPageProps } from "../../assets/helpers/interfaces/propsInterfaces";
import { getDominantColor } from '../../assets/helpers/colorPalette';

import './trackPage.css';

const TrackPage: React.FC<IPageProps> = ({ token, clickLink }) => {
  const {id} = useParams();
  const accessToken = token || localStorage.getItem("spotify_access_token");
  
  useEffect(() => {
    const fetchPageInfo = async () => {
      if (accessToken && id) {
        console.log(id);
      }
    }

    fetchPageInfo();
  }, [accessToken, id])

  return (
    <></>
  )
}

export default TrackPage