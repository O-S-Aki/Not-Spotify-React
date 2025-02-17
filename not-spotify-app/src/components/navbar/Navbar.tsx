import React from 'react';
import { Link } from 'react-router-dom';
import SpotifyIcon from '../../assets/images/spotify-icon-white.svg';

import './navbar.css';

interface NavbarProps {
  baseUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({baseUrl}) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/user">
          <img src={SpotifyIcon} alt="Application icon" className="navbar_brand-image" />
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

          <div className="navbar_profile-image ms-auto">
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar