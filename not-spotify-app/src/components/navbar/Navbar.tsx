import React from 'react';
import { Link } from 'react-router-dom';

import SpotifyIcon from '../../assets/images/spotify-icon-white.svg';
import SpotifyLogoFull from '../../assets/images/spotify-full-logo-white.svg';

import './navbar.css';

interface NavbarProps {
  accessToken: string | null;
  authUrl: string;
  logout: () => void;
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ accessToken, authUrl, logout, user }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark ps-3 pe-3">
      <div className="container-fluid">
        <Link className="navbar-brand m-0" to="/user">
          <img src={SpotifyIcon} alt="Application icon" className="navbar-image" />
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
          </ul>

          <div className="navbar_profile-container ms-auto">
            {
              accessToken ? (
                <>
                  {
                    user ? (
                      <div className='navbar_profile-image-container'>
                        <img className='navbar-image' src={user.images[0].url}></img>
                      </div>
                    ) : (
                      <p className='m-0'>Loading user...</p>
                    )
                  }
                  {
                    /*
                    <button className='btn btn-secondary btn-sm' onClick={logout}>Logout</button>
                    */
                  }
                </>
              ) : (
                <a href={authUrl}>Login with Spotify</a>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar