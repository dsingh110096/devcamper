import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ setAlert, login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please provide email & password', 'danger');
    } else {
      login({ email, password });
    }
  };
  //Redirect if loged in
  if (isAuthenticated) {
    return <Redirect to='/bootcamps' />;
  }
  return (
    <section className='form mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 m-auto'>
            <div className='card bg-white p-4 mb-4'>
              <div className='card-body'>
                <h1>
                  <i className='fas fa-sign-in-alt'></i> Login
                </h1>
                <p>
                  Log in to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                <form autoComplete='off' onSubmit={onSubmit}>
                  <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                      type='email'
                      name='email'
                      className='form-control'
                      placeholder='Enter email'
                      value={email}
                      onChange={onChange}
                    />
                  </div>
                  <div className='form-group mb-4'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      name='password'
                      className='form-control'
                      placeholder='Enter password'
                      value={password}
                      onChange={onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='submit'
                      value='Login'
                      className='btn btn-primary btn-block'
                    />
                  </div>
                </form>
                <p>
                  {' '}
                  Forgot Password?{' '}
                  <Link to='/reset-password'>Reset Password</Link>
                </p>
                <p className='my-1'>
                  Don't have an account? <Link to='/register'>Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
