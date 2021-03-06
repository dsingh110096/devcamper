import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllBootcamps, getBootcampInRadius } from '../../actions/bootcamp';
import SearchSideBar from './SearchSideBar';
import Pagination from './Pagination';
import Spinner from '../layout/Spinner';
import BootcampItem from './BootcampItem';

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

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [bootcampsPerPage] = useState(3);

  //Get current Bootcamps
  const indexOfLastBootcamp = currentPage * bootcampsPerPage;
  const indexOfFirstBootcamp = indexOfLastBootcamp - bootcampsPerPage;
  const currentBootcamps =
    bootcamps.data === undefined
      ? ''
      : bootcamps.data.slice(indexOfFirstBootcamp, indexOfLastBootcamp);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className='browse my-5'>
      <div className='container'>
        <div className='row'>
          {showSearchBar && <SearchSideBar />}
          {loading || bootcamps.data === undefined ? (
            <Spinner />
          ) : (
            <div className={showSearchBar ? 'col-md-8' : 'col-md-12'}>
              {bootcamps.data.length === 0 ? (
                <h1 className='bg-primary text-white p-2 text-center'>
                  No Bootcamps To show
                </h1>
              ) : (
                <BootcampItem bootcamps={currentBootcamps} />
              )}
              <Pagination
                itemPerPage={bootcampsPerPage}
                totalItems={bootcamps.data.length}
                paginate={paginate}
              />
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
