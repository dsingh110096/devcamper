import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import AuthLinks from './AuthLinks';
import GuestLinks from './GuestLinks';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
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
            <Fragment>
              {isAuthenticated ? <AuthLinks logout={logout} /> : <GuestLinks />}
            </Fragment>
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
