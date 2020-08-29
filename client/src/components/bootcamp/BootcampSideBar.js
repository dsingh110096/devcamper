import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BootcampSideBar = ({
  bootcamp: {
    _id,
    name,
    photo,
    housing,
    jobAssistance,
    jobGuarantee,
    acceptGi,
    website,
    averageRating,
  },
}) => {
  return (
    <div className='col-md-4'>
      <img src={`/${photo}`} className='img-fluid' alt={name} />

      <h1 className='text-center my-4'>
        <span className='badge badge-secondary badge-success rounded-circle p-3'>
          {averageRating ? averageRating : '4.5'}
        </span>{' '}
        Rating
      </h1>

      <Link to={`/reviews/${_id}`} className='btn btn-dark btn-block my-3'>
        <i className='fas fa-comments'></i> Read Reviews
      </Link>
      <Link to={`/add-review/${_id}`} className='btn btn-light btn-block my-3'>
        <i className='fas fa-pencil-alt'></i> Write a Review
      </Link>
      <a
        href={website}
        target='_blank'
        rel='noopener noreferrer'
        className='btn btn-secondary btn-block my-3'
      >
        <i className='fas fa-globe'></i> Visit Website
      </a>

      {/* <div id='map' style='width: 100%; height: 300px;'></div> */}

      <ul className='list-group list-group-flush mt-4'>
        <li className='list-group-item'>
          Housing{' '}
          {housing ? (
            <i className='fas fa-check text-success' />
          ) : (
            <i className='fas fa-times text-danger' />
          )}
        </li>
        <li className='list-group-item'>
          Job Assistance{' '}
          {jobAssistance ? (
            <i className='fas fa-check text-success' />
          ) : (
            <i className='fas fa-times text-danger' />
          )}
        </li>
        <li className='list-group-item'>
          Job Guarantee{' '}
          {jobGuarantee ? (
            <i className='fas fa-check text-success' />
          ) : (
            <i className='fas fa-times text-danger' />
          )}
        </li>
        <li className='list-group-item'>
          Accepts GI Bill{' '}
          {acceptGi ? (
            <i className='fas fa-check text-success' />
          ) : (
            <i className='fas fa-times text-danger' />
          )}
        </li>
      </ul>
    </div>
  );
};

BootcampSideBar.propTypes = {
  bootcamp: PropTypes.object.isRequired,
};

export default BootcampSideBar;
