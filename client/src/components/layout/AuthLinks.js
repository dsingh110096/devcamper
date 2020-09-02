import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthLinks = ({ logout }) => {
  return (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item dropdown'>
        <a
          className='nav-link dropdown-toggle'
          href='!#'
          id='navbarDropdown'
          role='button'
          data-toggle='dropdown'
        >
          <i className='fas fa-user'></i> Account
        </a>
        <div className='dropdown-menu'>
          <Link className='dropdown-item' to='/manage-bootcamp'>
            Manage Bootcamp
          </Link>
          <Link className='dropdown-item' to='/manage-reviews'>
            Manage Reviews
          </Link>
          <Link className='dropdown-item' to='/manage-account'>
            Manage Account
          </Link>
          <div className='dropdown-divider'></div>
          <Link className='dropdown-item' to='/login' onClick={(e) => logout()}>
            <i className='fas fa-sign-out-alt'></i> Logout
          </Link>
        </div>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/bootcamps'>
          Browse Bootcamps
        </Link>
      </li>
    </ul>
  );
};

AuthLinks.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default AuthLinks;
