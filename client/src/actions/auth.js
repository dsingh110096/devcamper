import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from '../actions/alert';
import axios from 'axios';
import scrollToTop from '../utils/scrollToTop';

//Register User
export const register = ({ name, email, password, role }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const formData = JSON.stringify({ name, email, password, role });
  try {
    const res = await axios.post('/api/v1/auth/register', formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      scrollToTop();
      dispatch(setAlert(errors, 'danger'));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
