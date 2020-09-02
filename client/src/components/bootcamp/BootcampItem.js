import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BootcampItem = ({ bootcamps }) => {
  return bootcamps.map((bootcamp) => (
    <div className='card mb-3' key={bootcamp._id}>
      <div className='row no-gutters'>
        <div className='col-md-4'>
          <img
            src={`/${bootcamp.photo}`}
            className='card-img'
            alt={bootcamp.name}
          />
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <h5 className='card-title'>
              <Link to={`/bootcamps/${bootcamp._id}`}>
                {bootcamp.name}
                <span className='float-right badge badge-success'>
                  {bootcamp.averageRating && bootcamp.averageRating}
                </span>
              </Link>
            </h5>
            <span className='badge badge-dark mb-2'>
              {bootcamp.location.city}, {bootcamp.location.stateCode}
            </span>
            <p className='card-text'>{bootcamp.careers.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  ));
};

BootcampItem.propTypes = {
  bootcamps: PropTypes.array.isRequired,
};

export default BootcampItem;
