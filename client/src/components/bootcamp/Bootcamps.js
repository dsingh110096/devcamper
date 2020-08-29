import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllBootcamps, getBootcampInRadius } from '../../actions/bootcamp';
import SearchSideBar from './SearchSideBar';
import Pagination from './Pagination';
import Spinner from '../layout/Spinner';
const Bootcamps = ({
  bootcamp: { bootcamps, loading },
  getAllBootcamps,
  getBootcampInRadius,
  showSearchBar,
  zipcode,
  distance,
}) => {
  useEffect(() => {
    if (showSearchBar) {
      getAllBootcamps();
    } else {
      getBootcampInRadius({ zipcode, distance });
    }
  }, [getAllBootcamps, getBootcampInRadius, zipcode, distance, showSearchBar]);

  return (
    <section className='browse my-5'>
      <div className='container'>
        <div className='row'>
          {showSearchBar && <SearchSideBar />}
          {loading || bootcamps.data === undefined ? (
            <Spinner />
          ) : (
            <div className={showSearchBar ? 'col-md-8' : 'col-md-12'}>
              {bootcamps.data.map((bootcamp) => (
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

Bootcamps.defaultProps = {
  showSearchBar: true,
};

Bootcamps.propTypes = {
  getAllBootcamps: PropTypes.func.isRequired,
  getBootcampInRadius: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, {
  getAllBootcamps,
  getBootcampInRadius,
})(Bootcamps);
