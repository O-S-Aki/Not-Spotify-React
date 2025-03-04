import React from "react";

import { useState, useEffect, useRef } from "react";
import { IPageProps } from "../../code-files/helpers/interfaces/propsInterfaces";

import './searchBar.css';

const SearchBar: React.FC<IPageProps> = ({ token, clickLink }) => {
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

            <div className="search-field">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input type="text" className="form-control" placeholder="Search..." aria-label="Search" />
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