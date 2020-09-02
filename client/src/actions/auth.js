import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_ERROR,
} from './types';

import { setAlert } from '../actions/alert';
import axios from 'axios';
import scrollToTop from '../utils/scrollToTop';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/v1/auth/me');
    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

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
    dispatch(loadUser());
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

//Login User
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const formData = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/v1/auth/login', formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }
    dispatch({
      type: LOGIN_ERROR,
    });
  }
};

//Logout Or Clear Profile
export const logout = () => async (dispatch) => {
  try {
    await axios.get('/api/v1/auth/logout');
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    dispatch({
      type: LOGOUT_ERROR,
    });
  }
};
