import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllBootcamps } from '../../actions/bootcamp';
import SearchSideBar from './SearchSideBar';
import Pagination from './Pagination';
const Bootcamps = ({ bootcamp: { bootcamps, loading }, getAllBootcamps }) => {
  useEffect(() => {
    getAllBootcamps();
  }, [getAllBootcamps]);

  return (
    <section className='browse my-5'>
      <div className='container'>
        <div className='row'>
          <SearchSideBar />
          {bootcamps.data === undefined ? (
            ''
          ) : (
            <div className='col-md-8'>
              {bootcamps.data.map((bootcamp) => (
                <div className='card mb-3' key={bootcamp._id}>
                  <div className='row no-gutters'>
                    <div className='col-md-4'>
                      <img
                        src={bootcamp.photo}
                        className='card-img'
                        alt={bootcamp.name}
                      />
                    </div>
                    <div className='col-md-8'>
                      <div className='card-body'>
                        <h5 className='card-title'>
                          <Link to='/bootcamp'>
                            {bootcamp.name}
                            <span className='float-right badge badge-success'>
                              {bootcamp.averageRating && bootcamp.averageRating}
                            </span>
                          </Link>
                        </h5>
                        <span className='badge badge-dark mb-2'>
                          {bootcamp.location.city},{' '}
                          {bootcamp.location.stateCode}
                        </span>
                        <p className='card-text'>
                          {bootcamp.careers.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Pagination />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Bootcamps.propTypes = {
  getAllBootcamps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getAllBootcamps })(Bootcamps);