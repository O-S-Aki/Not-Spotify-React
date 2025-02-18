import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../navbar.css'

interface NavbarDropdownProps {
  logout: () => void;
  user: any;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ user, logout }) => {

  const [isOpen, setIsOpen] = useState(false);

  // toggling the dropdown
  const toggleDropdown = () => {
    setIsOpen((state) => !state)
  }

  return (
    <>
      <div className='navbar_profile-image-container'>
        <img className='navbar-image' src={user.images[0].url} onClick={toggleDropdown}></img>
      </div>
      
      {
        isOpen ? (
          <>
            <div className="navbar_dropdown-container position-absolute">
              <Link to='/user/profile'>
                <div className="dropdown-section small-font p-2 pb-1 m-1">
                  <i className="bi bi-person-fill"></i> Profile
                </div>
              </Link>
              <hr className='m-0'/>
              <Link to='/'>
                <div onClick={logout} className="dropdown-section small-font p-2 pt-1 m-1">
                  <i className="bi bi-box-arrow-left"></i> Log Out
                </div>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}

export default NavbarDropdown