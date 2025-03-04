import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { INavbarDropdownProps } from '../../../code-files/helpers/interfaces/propsInterfaces';

import '../navbar.css'

const NavbarDropdown: React.FC<INavbarDropdownProps> = ({ user, logout }) => {

  const [isOpen, setIsOpen] = useState(false);

  // toggling the dropdown
  const toggleDropdown = () => {
    setIsOpen((state) => !state)
  }

  const closeAndLogout = () => {
    toggleDropdown();
    logout();
  }

  return (
    <>
      <div className='navbar_profile-image-container'>
        <img className='navbar-image' src={user.image} onClick={toggleDropdown}></img>
      </div>
      
      {
        isOpen ? (
          <>
            <div className="navbar_dropdown-container position-absolute">
              <Link to='/user/current'>
                <div onClick={toggleDropdown} className="dropdown-section p-2 pb-1 m-1">
                  <p className="m-0"><i className="bi bi-person-fill"></i> Profile</p>
                </div>
              </Link>
              <hr className='m-0'/>
              <Link to='/'>
                <div onClick={closeAndLogout} className="dropdown-section p-2 pt-1 m-1">
                  <p className="m-0"><i className="bi bi-box-arrow-left"></i> Log Out</p>
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