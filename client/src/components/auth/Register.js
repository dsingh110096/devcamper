import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import scrollToTop from '../../utils/scrollToTop';

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    password2: '',
    email: '',
    role: '',
  });
  const { name, password, password2, email, role } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      name === '' ||
      password === '' ||
      password2 === '' ||
      email === '' ||
      role === ''
    ) {
      scrollToTop();
      setAlert('Please provide the all inputs', 'danger');
    } else if (password !== password2) {
      scrollToTop();
      setAlert('Password do not match', 'danger');
    } else {
      console.log(formData);
    }
  };
  return (
    <section className='form mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 m-auto'>
            <div className='card bg-white p-4 mb-4'>
              <div className='card-body'>
                <h1>
                  <i className='fas fa-user-plus'></i> Register
                </h1>
                <p>
                  Register to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                <form onSubmit={onSubmit} autoComplete='off'>
                  <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                      type='text'
                      name='name'
                      className='form-control'
                      placeholder='Enter full name'
                      value={name}
                      onChange={onChange}
                    />
                  </div>
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
                  <div className='form-group'>
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
                  <div className='form-group mb-4'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input
                      type='password'
                      name='password2'
                      className='form-control'
                      placeholder='Confirm password'
                      value={password2}
                      onChange={onChange}
                    />
                  </div>

                  <div className='card card-body mb-3'>
                    <h5>User Role</h5>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='role'
                        value='user'
                        onChange={onChange}
                      />
                      <label className='form-check-label'>
                        Regular User (Browse, Write reviews, etc)
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        id='radio'
                        type='radio'
                        name='role'
                        value='publisher'
                        onChange={onChange}
                      />
                      <label className='form-check-label'>
                        Bootcamp Publisher
                      </label>
                    </div>
                  </div>
                  <p className='text-danger'>
                    * You must be affiliated with the bootcamp in some way in
                    order to add it to DevCamper.
                  </p>
                  <div className='form-group'>
                    <input
                      type='submit'
                      value='Register'
                      className='btn btn-primary btn-block'
                    />
                  </div>
                </form>
                <p className='my-1'>
                  Already have an account? <Link to='/login'>Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
