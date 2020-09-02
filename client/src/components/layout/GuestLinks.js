import React from 'react';
import { Link } from 'react-router-dom';

const GuestLinks = () => {
  return (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          <i className='fas fa-sign-in-alt'></i> Login
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          <i className='fas fa-user-plus'></i> Register
        </Link>
      </li>
      <li className='nav-item d-none d-sm-block'>
        <Link className='nav-link' to='!#'>
          |
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/bootcamps'>
          Browse Bootcamps
        </Link>
      </li>
    </ul>
  );
};

export default GuestLinks;
