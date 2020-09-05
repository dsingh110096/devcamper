import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createBootcamp } from '../../actions/bootcamp';
import { connect } from 'react-redux';

const AddBootcamp = ({ createBootcamp, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    careers: [],
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
    acceptGi: false,
  });
  const {
    name,
    address,
    phone,
    email,
    website,
    description,
    careers,
    housing,
    jobAssistance,
    jobGuarantee,
    acceptGi,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createBootcamp(formData, history);
  };

  return (
    <section className='container mt-5'>
      <h1 className='mb-2'>Add Bootcamp</h1>
      <p>
        Important: You must be affiliated with a bootcamp to add to DevCamper
      </p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card bg-white py-2 px-4'>
              <div className='card-body'>
                <h3>Location &amp; Contact</h3>
                <p className='text-muted'>
                  If multiple locations, use the main or largest
                </p>
                <div className='form-group'>
                  <label>Name</label>
                  <input
                    type='text'
                    name='name'
                    className='form-control'
                    placeholder='Bootcamp Name'
                    htmlFor='Name'
                    value={name}
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Address</label>
                  <input
                    type='text'
                    name='address'
                    className='form-control'
                    placeholder='Full Address'
                    value={address}
                    onChange={onChange}
                  />
                  <small className='form-text text-muted'>
                    Street, city, state, etc
                  </small>
                </div>
                <div className='form-group'>
                  <label>Phone Number</label>
                  <input
                    type='text'
                    name='phone'
                    className='form-control'
                    placeholder='Phone'
                    value={phone}
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type='text'
                    name='email'
                    className='form-control'
                    placeholder='Contact Email'
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Website</label>
                  <input
                    type='text'
                    name='website'
                    className='form-control'
                    placeholder='Website URL'
                    value={website}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card bg-white py-2 px-4'>
              <div className='card-body'>
                <h3>Other Info</h3>
                <div className='form-group'>
                  <label>Description</label>
                  <textarea
                    name='description'
                    rows='5'
                    className='form-control'
                    placeholder='Description (What you offer, etc)'
                    value={description}
                    onChange={onChange}
                  ></textarea>
                  <small className='form-text text-muted'>
                    No more than 500 characters
                  </small>
                </div>
                <div className='form-group'>
                  <label>Careers</label>
                  <select
                    name='careers'
                    className='custom-select'
                    multiple
                    value={careers}
                    onChange={(e) => {
                      let options = e.target.options;
                      for (let i = 0; i < options.length; i++) {
                        if (options[i].selected) {
                          if (careers.includes(options[i].value)) {
                            const index = careers.indexOf(options[i].value);
                            if (index > -1) careers.splice(index, 1);
                          } else {
                            careers.push(options[i].value);
                          }
                        }
                      }
                    }}
                  >
                    <option disabled>Select all that apply</option>
                    <option value='Web Development'>Web Development</option>
                    <option value='Mobile Development'>
                      Mobile Development
                    </option>
                    <option value='UI/UX'>UI/UX</option>
                    <option value='Data Science'>Data Science</option>
                    <option value='Business'>Business</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='housing'
                    id='housing'
                    value={housing}
                    checked={housing}
                    onChange={(e) =>
                      setFormData({ ...formData, housing: !housing })
                    }
                  />
                  <label className='form-check-label' htmlFor='housing'>
                    Housing
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='jobAssistance'
                    id='jobAssistance'
                    value={jobAssistance}
                    checked={jobAssistance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jobAssistance: !jobAssistance,
                      })
                    }
                  />
                  <label className='form-check-label' htmlFor='jobAssistance'>
                    Job Assistance
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='jobGuarantee'
                    id='jobGuarantee'
                    value={jobGuarantee}
                    checked={jobGuarantee}
                    onChange={(e) =>
                      setFormData({ ...formData, jobGuarantee: !jobGuarantee })
                    }
                  />
                  <label className='form-check-label' htmlFor='jobGuarantee'>
                    Job Guarantee
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='acceptGi'
                    id='acceptGi'
                    value={acceptGi}
                    checked={acceptGi}
                    onChange={(e) =>
                      setFormData({ ...formData, acceptGi: !acceptGi })
                    }
                  />
                  <label className='form-check-label' htmlFor='acceptGi'>
                    Accepts GI Bill
                  </label>
                </div>
                <p className='text-muted my-4'>
                  *After you add the bootcamp, you can add the specific courses
                  offered
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Submit Bootcamp'
            className='btn btn-success btn-block my-4'
          />
        </div>
      </form>
    </section>
  );
};

AddBootcamp.propTypes = {
  createBootcamp: PropTypes.func.isRequired,
};

export default connect(null, { createBootcamp })(AddBootcamp);
