import React from 'react';
import Bootcamps from './Bootcamps';

const BootcampsInRadius = ({ match }) => {
  return (
    <Bootcamps
      showSearchBar={false}
      zipcode={match.params.zipcode}
      distance={match.params.distance}
    />
  );
};

export default BootcampsInRadius;
