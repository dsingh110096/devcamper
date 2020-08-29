import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getBootcampInRadius } from '../../actions/bootcamp';

const Landing = ({ isAuthenticated, getBootcampInRadius, history }) => {
  const [formData, setFormData] = useState({
    distance: '',
    zipcode: '',
  });
  const { distance, zipcode } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    getBootcampInRadius({ zipcode, distance });
    history.push(`/bootcamps/${zipcode}/${distance}`);
  };
  if (isAuthenticated) {
    return <Redirect to='/bootcamps' />;
  }
  return (
    <section className='showcase'>
      <div className='dark-overlay'>
        <div className='showcase-inner container'>
          <h1 className='display-4'>Find a Code Bootcamp</h1>
          <p className='lead'>
            Find, rate and read reviews on coding bootcamps
          </p>
          <form onSubmit={onSubmit}>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='distance'
                    value={distance}
                    onChange={onChange}
                    placeholder='Miles From'
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='zipcode'
                    value={zipcode}
                    onChange={onChange}
                    placeholder='Enter Zipcode'
                  />
                </div>
              </div>
            </div>
            <input
              type='submit'
              value='Find Bootcamps'
              className='btn btn-primary btn-block'
            />
          </form>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  getBootcampInRadius: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getBootcampInRadius })(Landing);
