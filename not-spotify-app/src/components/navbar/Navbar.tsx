import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarDropdown } from '../../components';

import SpotifyIcon from '../../assets/images/spotify-icon-white.svg';

import './navbar.css';

interface NavbarProps {
  accessToken: string | null;
  authUrl: string;
  logout: () => void;
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ accessToken, authUrl, user, logout }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark ps-3 pe-3">
      <div className="container-fluid">
        <Link className="navbar-brand m-0" to="/">
          <img src={SpotifyIcon} alt="Application icon" className="navbar-image" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
          </ul>

          <div className="navbar_profile-container ms-auto position-relative">
            {
              accessToken ? (
                <>
                  {
                    user ? (
                      <>
                        <NavbarDropdown user={user} logout={logout} />
                      </>
                    ) : (
                      <div>
                        <p className='m-0 translucent-text'>Loading user...</p>
                        <a href={authUrl} className='translucent-text page-link small-font'>Refresh Token</a>
                      </div>
                    )
                  }
                </>
              ) : (
                <a className='translucent-text page-link' href={authUrl}>Login with Spotify</a>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar