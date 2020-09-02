import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AuthLinks = ({ auth: { user }, logout }) => {
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
          {user === null ? (
            ''
          ) : (
            <Fragment>
              {user.role === 'publisher' && (
                <Link className='dropdown-item' to='/manage-bootcamp'>
                  Manage Bootcamp
                </Link>
              )}
            </Fragment>
          )}

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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AuthLinks);
