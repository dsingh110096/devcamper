import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getReviewsByBootcamp } from '../../actions/review';

const Reviews = ({
  bootcamp: { bootcamp },
  review: { reviews, loading },
  match,
  getReviewsByBootcamp,
}) => {
  useEffect(() => {
    getReviewsByBootcamp(match.params.bootcampId);
  }, [getReviewsByBootcamp, match.params.bootcampId]);

  return (
    <section className='bootcamp mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            <Link
              to={`/bootcamps/${match.params.bootcampId}`}
              className='btn btn-secondary my-3'
            >
              <i className='fas fa-chevron-left'></i> Bootcamp Info
            </Link>
            <h1 className='mb-4'>
              {bootcamp === null ? <Spinner /> : bootcamp.name}
            </h1>
            {reviews.length === 0 ? (
              <Fragment>
                {loading ? (
                  ''
                ) : (
                  <h5 className='bg-primary text-white p-2'>No Reviews Yet.</h5>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {reviews.length === 0 ? (
                  <Spinner />
                ) : (
                  reviews.map((review) => (
                    <div className='card mb-3' key={review._id}>
                      <h5 className='card-header bg-dark text-white'>
                        {review.title}
                      </h5>
                      <div className='card-body'>
                        <h5 className='card-title'>
                          Rating:{' '}
                          <span className='text-success'>{review.rating}</span>
                        </h5>
                        <p className='card-text'>{review.text}</p>
                        <p className='text-muted'>
                          Writtern By {review.user.name}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </Fragment>
            )}
          </div>

          <div className='col-md-4'>
            <h1 className='text-center my-4'>
              Rating{' '}
              {bootcamp === null ? (
                <Spinner />
              ) : (
                <span className='badge badge-secondary badge-success rounded-circle p-3'>
                  {' '}
                  {bootcamp.averageRating}
                </span>
              )}
            </h1>

            <Link
              to={`/add-review/${bootcamp === null ? '' : bootcamp._id}`}
              className='btn btn-primary btn-block my-3'
            >
              <i className='fas fa-pencil-alt'></i> Review This Bootcamp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Reviews.propTypes = {
  getReviewsByBootcamp: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getReviewsByBootcamp })(Reviews);
