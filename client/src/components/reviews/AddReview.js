import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addReviewToBootcamp } from '../../actions/review';

const AddReview = ({ match, addReviewToBootcamp, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    rating: '',
    text: '',
  });
  const { title, rating, text } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addReviewToBootcamp(formData, match.params.bootcampId, history);
  };
  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <Link
                to={`/bootcamps/${match.params.bootcampId}`}
                className='btn btn-link text-secondary my-3'
              >
                <i className='fas fa-chevron-left'></i> Bootcamp Info
              </Link>
              <h1 className='mb-2'>DevWorks Bootcamp</h1>
              <h3 className='text-primary mb-4'>Write a Review</h3>
              <p>
                You must have attended and graduated this bootcamp to review
              </p>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label htmlFor='rating'>
                    Rating:{' '}
                    <span className='text-primary'>
                      {rating === '' ? '6' : rating}
                    </span>
                  </label>
                  <input
                    type='range'
                    id='rating'
                    className='custom-range'
                    min='1'
                    max='10'
                    step='1'
                    name='rating'
                    value={rating}
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    name='title'
                    className='form-control'
                    placeholder='Review title'
                    value={title}
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    name='text'
                    rows='10'
                    className='form-control'
                    placeholder='Your review'
                    value={text}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className='form-group'>
                  <input
                    type='submit'
                    value='Submit Review'
                    className='btn btn-dark btn-block'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AddReview.propTypes = {
  addReviewToBootcamp: PropTypes.func.isRequired,
};

export default connect(null, { addReviewToBootcamp })(AddReview);
