import React from 'react';

const SearchSideBar = () => {
  return (
    <div className='col-md-4'>
      <div className='card card-body mb-4'>
        <h4 className='mb-3'>By Location</h4>
        <form>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  name='miles'
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
      <form>
        {/* <div className='form-group'>
          <label> Career</label>
          <select className='custom-select mb-2'>
            <option value='any' defaultValue>
              Any
            </option>
            <option value='Web Development'>Web Development</option>
            <option value='Mobile Development'>Mobile Development</option>
            <option value='UI/UX'>UI/UX</option>
            <option value='Data Science'>Data Science</option>
            <option value='Business'>Business</option>
            <option value='Other'>Other</option>
          </select>
        </div> */}

        <div className='form-group'>
          <label> Rating</label>
          <select className='custom-select mb-2'>
            <option value='any' defaultValue>
              Any
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
          <select className='custom-select mb-2'>
            <option value='any' defaultValue>
              Any
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

export default SearchSideBar;
