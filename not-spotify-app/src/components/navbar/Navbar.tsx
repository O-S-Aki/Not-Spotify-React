import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarDropdown, SearchBar } from '../../components';
import { IUser } from '../../code-files/interfaces/';

import SpotifyIcon from '../../assets/spotify-icon-white.svg';
import './navbar.css';

interface INavbarProps {
  token: string | null;
  authUrl: string;
  user: IUser;
  logout: () => void;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

const Navbar: React.FC<INavbarProps> = ({ token, authUrl, user, logout, clickLink }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark p-3">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand m-0" to="/">
          <img src={SpotifyIcon} alt="Application icon" className="navbar-image" />
        </Link>

        <SearchBar token={null} clickLink={clickLink} />

        <div className="navbar_profile-container position-relative">
            {
              token ? (
                <>
                  {
                    user ? (
                      <>
                        <NavbarDropdown user={user} logout={logout} />
                      </>
                    ) : (
                      <div>
                        <a href={authUrl} className='translucent-text page-link small-font'>Click to Refresh Token</a>
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
    </nav>
  )
}

export default Navbar