import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { IPageProps } from "../../assets/helpers/interfaces/propsInterfaces";
import { getDominantColor } from '../../assets/helpers/colorPalette';

import { IAlbum } from "../../assets/helpers/interfaces/objectInterfaces";

import './albumPage.css';
import { getAlbumDetails } from "../../assets/api-calls/album";

const AlbumPage: React.FC<IPageProps> = ({ token, clickLink }) => {
  const {id} = useParams();
  const accessToken = token || localStorage.getItem("spotify_access_token");

  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [dominantColorRgb, setDominantColorRgb] = useState<string>("");
  
  useEffect(() => {
    const fetchPageInfo = async () => {
      if (accessToken && id) {
        const albumDetails: IAlbum | null = await getAlbumDetails(accessToken, id);
        if (albumDetails) {
          setAlbum(albumDetails);

          // fetching the dominant colour to use as the background
          getDominantColor(albumDetails.primary.image)
            .then((rgb) => setDominantColorRgb(rgb))
            .catch((err) => console.error("Error getting dominant color:", err));
        }
      }
    }

    fetchPageInfo();
  }, [accessToken, id])

  return (
    <>
    </>
  )
}

export default AlbumPage