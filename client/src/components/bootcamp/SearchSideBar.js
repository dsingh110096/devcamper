import React, { useState } from 'react';
import { getBootcampInRadius, filteredBootcamps } from '../../actions/bootcamp';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import scrollToTop from '../../utils/scrollToTop';

const SearchSideBar = ({
  getBootcampInRadius,
  setAlert,
  filteredBootcamps,
}) => {
  const [formData, setFormData] = useState({
    zipcode: '',
    distance: '',
  });

  const [filterData, setFilterData] = useState({
    averageRating: '',
    averageCost: '',
  });

  const { averageRating, averageCost } = filterData;

  const { zipcode, distance } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (zipcode === '' || distance === '') {
      scrollToTop();
      setAlert('Please provide zipcode and distance.', 'danger');
    } else {
      getBootcampInRadius({ zipcode, distance });
      setFormData({ zipcode: '', distance: '' });
    }
  };
  const onChangeFilter = (e) =>
    setFilterData({ ...filterData, [e.target.name]: e.target.value });

  const onSubmitFilter = (e) => {
    e.preventDefault();
    if (averageCost === '' || averageRating === '') {
      scrollToTop();
      setAlert('Please choose rating and budget', 'danger');
    } else {
      filteredBootcamps({ averageRating, averageCost });
      setFilterData({ averageRating: '', averageCost: '' });
    }
  };

  return (
    <div className='col-md-4'>
      <div className='card card-body mb-4'>
        <h4 className='mb-3'>By Location</h4>
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

      <h4>Filter</h4>
      <form onSubmit={onSubmitFilter}>
        <div className='form-group'>
          <label> Rating</label>
          <select
            className='custom-select mb-2'
            name='averageRating'
            value={averageRating}
            onChange={onChangeFilter}
          >
            <option value='choose' defaultValue>
              Choose
            </option>
            <option value='9'>9+</option>
            <option value='8'>8+</option>
            <option value='7'>7+</option>
            <option value='6'>6+</option>
            <option value='5'>5+</option>
            <option value='4'>4+</option>
            <option value='3'>3+</option>
            <option value='2'>2+</option>
          </select>
        </div>

        <div className='form-group'>
          <label> Budget</label>
          <select
            className='custom-select mb-2'
            name='averageCost'
            value={averageCost}
            onChange={onChangeFilter}
          >
            <option value='choose' defaultValue>
              Choose
            </option>
            <option value='20000'>$20,000</option>
            <option value='15000'>$15,000</option>
            <option value='10000'>$10,000</option>
            <option value='8000'>$8,000</option>
            <option value='6000'>$6,000</option>
            <option value='4000'>$4,000</option>
            <option value='2000'>$2,000</option>
          </select>
        </div>
        <input
          type='submit'
          value='Find Bootcamps'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

SearchSideBar.propTypes = {
  getBootcampInRadius: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  filteredBootcamps: PropTypes.func.isRequired,
};

export default connect(null, {
  getBootcampInRadius,
  setAlert,
  filteredBootcamps,
})(SearchSideBar);
