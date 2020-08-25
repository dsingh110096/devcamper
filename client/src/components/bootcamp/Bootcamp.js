import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSingleBootcamp } from '../../actions/bootcamp';
import Spinner from '../layout/Spinner';
import Course from '../course/Course';
import BootcampSideBar from './BootcampSideBar';

const Bootcamp = ({
  bootcamp: { bootcamp, loading },
  getSingleBootcamp,
  match,
}) => {
  useEffect(() => {
    getSingleBootcamp(match.params.bootcampId);
  }, [getSingleBootcamp, match.params.bootcampId]);

  return (
    <section className='bootcamp mt-5'>
      <div className='container'>
        {loading || bootcamp === null ? (
          <Spinner />
        ) : (
          <div className='row'>
            <div className='col-md-8'>
              <h1>{bootcamp.name}</h1>
              <p>{bootcamp.description}</p>
              <p className='lead mb-4'>
                {bootcamp.averageCost ? (
                  <Fragment>
                    Average Course Cost:{' '}
                    <span className='text-primary'>
                      ${bootcamp.averageCost}
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    Average Course Cost:{' '}
                    <span className='text-primary'>Not Available</span>
                  </Fragment>
                )}
              </p>
              {bootcamp.courses.length === 0 ? (
                <h5 className='bg-primary text-white p-2'>
                  No Courses Available Yet
                </h5>
              ) : (
                bootcamp.courses.map((course) => (
                  <Course key={course._id} course={course} />
                ))
              )}
            </div>
            <BootcampSideBar bootcamp={bootcamp} />
          </div>
        )}
      </div>
    </section>
  );
};

Bootcamp.propTypes = {
  getSingleBootcamp: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({ bootcamp: state.bootcamp });
export default connect(mapStateToProps, { getSingleBootcamp })(Bootcamp);
