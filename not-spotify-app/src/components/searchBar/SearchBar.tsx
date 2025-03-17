import React from "react";

import { useState, useEffect, useRef } from "react";

import './searchBar.css';

interface ISearchBarProps {
  token: string | null;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ token, clickLink }) => {
  const [accessToken, setAccessToken] = useState<string | null>(token || localStorage.getItem("spotify_access_token"));

  return (
    <>
    {
      accessToken ? (
        <>
          <div className="search-bar d-flex flex-row gap-2">
            <div className="search-home-button h-100 p-2 d-flex align-items-center justify-content-center">
              <i className="bi bi-house-door-fill"></i>
            </div>

            <div className="search-field d-flex align-items-center justify-content-center">
              <div className="input-group px-2">
                <span className="p-1">
                  <i className="bi bi-search"></i>
                </span>
                <input type="text" className="p-1" placeholder="Search..." aria-label="Search" />
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

export default SearchBar