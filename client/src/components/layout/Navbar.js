import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const guestLinks = (
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
  const authLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/' onClick={logout}>
          <i className='fas fa-sign-in-alt'></i> Logout
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/bootcamps'>
          Browse Bootcamps
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-primary sticky-top'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          <i className='fas fa-laptop-code'></i> DevCamper
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
