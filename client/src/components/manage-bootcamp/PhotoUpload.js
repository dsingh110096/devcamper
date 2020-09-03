import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';

const PhotoUpload = ({ bootcampId, setAlert }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e, bootcampId) => {
    e.preventDefault();
    if (file === '' || filename === 'Choose file') {
      setAlert('Please Upload File', 'danger');
    } else {
      const formData = new FormData();
      formData.append('file', file, filename);
      try {
        await axios.put(`/api/v1/bootcamps/${bootcampId}/photo`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (ProgressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
              )
            );
            //Clear Percentage
            setTimeout(() => setUploadPercentage(0), 5000);
          },
        });
        setFilename('Choose File');
        setAlert('Image Uploaded Successfully...', 'success');
      } catch (err) {
        setFilename('Choose File');
        setAlert(err.response.data.error, 'danger');
      }
    }
  };
  return (
    <form className='mb-4' onSubmit={(e) => onSubmit(e, bootcampId)}>
      <div className='form-group'>
        <div className='custom-file'>
          <input
            type='file'
            name='photo'
            className='custom-file-input'
            id='photo'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='photo'>
            {filename}
          </label>
        </div>
      </div>
      <ProgressBar percentage={uploadPercentage} />
      <input
        type='submit'
        className='btn btn-light btn-block'
        value='Upload Image'
      />
    </form>
  );
};

PhotoUpload.propTypes = {
  bootcampId: PropTypes.string.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(PhotoUpload);
