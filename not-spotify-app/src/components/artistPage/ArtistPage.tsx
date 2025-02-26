import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { ITabbedPageProps } from "../../assets/helpers/interfaces/propsInterfaces";
import { getDominantColor } from '../../assets/helpers/colorPalette';
import { IAlbumList, IArtist, ITrackList } from "../../assets/helpers/interfaces/objectInterfaces";

import { getArtistProfile, getPopularTracks, getFullDiscography, getAlbums, getSingles } from "../../assets/api-calls/artist";

import { Popularity, Tracks, Albums } from '../../components';

import './artistPage.css';

const ArtistPage: React.FC<ITabbedPageProps> = ({ token, clickLink, updateElementClasses }) => {
  const {id} = useParams();
  const accessToken = token || localStorage.getItem("spotify_access_token");
  
  const [artist, setArtist] = useState<IArtist | null>(null);
  const [dominantColorRgb, setDominantColorRgb] = useState<string>("");
  
  const [popularTracks, setPopularTracks] = useState<ITrackList | null>(null);
  const [discography, setDiscography] = useState<IAlbumList | null>(null);
  const [albums, setAlbums] = useState<IAlbumList | null>(null);
  const [singles, setSingles] = useState<IAlbumList | null>(null);

  const popularTabRef = useRef<HTMLDivElement | null>(null);
  const albumsTabRef = useRef<HTMLDivElement | null>(null);
  const singlesTabRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const fetchPageInfo = async () => {
      if (accessToken && id) {
        // fetching the artist profile
        const artistProfile: IArtist | null = await getArtistProfile(accessToken, id);
        if (artistProfile) {
          setArtist(artistProfile);

          // fetching the dominant colour to use as the background
          getDominantColor(artistProfile.primary.image)
            .then((rgb) => setDominantColorRgb(rgb))
            .catch((err) => console.error("Error getting dominant color:", err));

          // fetching the artist's popular tracks
          const artistTracks = await getPopularTracks(accessToken, artistProfile.primary.id);
          if (artistTracks) {
            setPopularTracks(artistTracks);
          }
          
          // fetching the artist's full discography
          const artistDiscography = await getFullDiscography(accessToken, artistProfile.primary.id);
          if (artistDiscography) {
            setDiscography(artistDiscography);
            setActiveTab(<Albums albums={artistDiscography} maxAlbums={6} clickLink={clickLink} />)
          }

          // fetching the artist's albums only
          const artistAlbums = await getAlbums(accessToken, artistProfile.primary.id);
          if (artistAlbums) {
            setAlbums(artistAlbums);
          }

          // fetching the artist's singles only
          const artistSingles = await getSingles(accessToken, artistProfile.primary.id);
          if (artistSingles) {
            setSingles(artistSingles);
          }
        }
      }
    }

    fetchPageInfo();
    updateAlbums(0);
  }, [accessToken, id])

  const updateAlbums = (clickedTab: 0 | 1 | 2): void => {
    const tabs = [popularTabRef.current, albumsTabRef.current, singlesTabRef.current];
    const albumList = [discography, albums, singles];

    for (let i = 0; i < tabs.length; i++) {
      updateElementClasses(tabs[i], i === clickedTab ? true : false, ['active'])  
    }
    
    if (albumList[clickedTab]) {
      setActiveTab(<Albums albums={albumList[clickedTab]!} maxAlbums={6} clickLink={clickLink} />)
    }
  }
  
  return (
    <>
    {
      artist && dominantColorRgb && popularTracks && discography && albums && singles ? (
        <>
          <div className="app-page">

            <div className="container summary-container section-container row g-3">
              <div className="col col-12 col-lg-6 order-1 order-lg-0 artist-profile-description d-flex flex-column">
                {
                  artist.verified ? (
                    <>
                      <h5><i className="bi bi-patch-check-fill"></i> Verified Artist</h5>
                    </>
                  ) : (
                    <></>
                  )
                }
                <p className="artist-display-name mb-1">{artist.primary.name}</p>
                <h5>{artist.followers.toLocaleString()} Followers</h5>
                <Popularity score={artist.popularity} />
                
                <div className="container tracks-container section-container mt-3 p-4 d-flex flex-column">
                  <h5 className="mb-3 section-header">Popular</h5>
                  <Tracks tracks={popularTracks} maxTracks={5} showHead={false} showImage={true} showAlbum={false} showDate={false} clickLink={clickLink} />
                </div>
              </div>

              <div className="col col-12 col-lg-6 order-0 order-lg-1 d-flex flex-column justify-content-end">
                <div className="artist-profile-image-container faded-image-container square-container w-100">
                  <img src={artist.primary.image} alt={artist.primary.name} className="w-100 square" />
                </div>
              </div>
            </div>

            <div className="container section-container">
              <ul className="nav nav-tabs">
                <li className="nav-item m-1">
                  <div className="nav-link active" ref={popularTabRef} onClick={() => updateAlbums(0)}>Popular Releases</div>
                </li>
                <li className="nav-item m-1">
                  <div className="nav-link" ref={albumsTabRef} onClick={() => updateAlbums(1)}>Albums</div>
                </li>
                <li className="nav-item m-1">
                  <div className="nav-link" ref={singlesTabRef} onClick={() => updateAlbums(2)}>Singles & EPs</div>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab">
                  <div className="container albums-container section-container p-4 d-flex flex-column">
                    {activeTab}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      ) : (
        <></>
      )
    }
    </>
  )
}

export default ArtistPage