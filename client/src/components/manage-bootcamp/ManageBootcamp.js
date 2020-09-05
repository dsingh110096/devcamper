import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllBootcamps } from '../../actions/bootcamp';
import { Link } from 'react-router-dom';
import BootcampDetails from './BootcampDetails';
import Spinner from '../layout/Spinner';

const ManageBootcamp = ({
  bootcamp: { bootcamps, loading },
  auth,
  getAllBootcamps,
}) => {
  useEffect(() => {
    getAllBootcamps();
  }, [getAllBootcamps]);

  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <h1 className='mb-4'>Manage Bootcamp</h1>
              {loading || bootcamps.data === undefined || auth.user === null ? (
                <Spinner />
              ) : (
                <Fragment>
                  {bootcamps.data.filter(
                    (bootcamp) => bootcamp.user === auth.user._id
                  ).length === 0 ? (
                    <Fragment>
                      {' '}
                      <p className='lead'>You have not yet added a bootcamp</p>
                      <Link
                        to='/add-bootcamp'
                        className='btn btn-primary btn-block'
                      >
                        Add Bootcamp
                      </Link>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {bootcamps.data
                        .filter((bootcamp) => bootcamp.user === auth.user._id)
                        .map((bootcamp) => (
                          <BootcampDetails
                            key={bootcamp._id}
                            bootcamp={bootcamp}
                          />
                        ))}
                      <Link
                        to='/add-bootcamp'
                        className='btn btn-primary btn-block'
                      >
                        Edit Bootcamp Details
                      </Link>
                      <Link
                        to='/manage-courses'
                        className='btn btn-secondary btn-block'
                      >
                        Manage Courses
                      </Link>
                      <Link to='#!' className='btn btn-danger btn-block'>
                        Remove Bootcamp
                      </Link>
                    </Fragment>
                  )}
                </Fragment>
              )}
              <p className='text-muted mt-5'>
                * You can only add one bootcamp per account.
              </p>
              <p className='text-muted'>
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ManageBootcamp.propTypes = {
  bootcamp: PropTypes.object.isRequired,
  getAllBootcamps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllBootcamps,
})(ManageBootcamp);
