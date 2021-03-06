import {
  GET_ALL_BOOTCAMPS,
  GET_SINGLE_BOOTCAMP,
  BOOTCAMP_ERROR,
  GET_BOOTCAMP_IN_RADIUS,
  FITERED_BOOTCAMPS,
  CLEAR_BOOTCAMPS,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
export const getAllBootcamps = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/bootcamps');
    dispatch({
      type: GET_ALL_BOOTCAMPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: BOOTCAMP_ERROR });
  }
};
export const getSingleBootcamp = (bootcampId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${bootcampId}`);
    dispatch({
      type: GET_SINGLE_BOOTCAMP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: BOOTCAMP_ERROR });
  }
};

export const createBootcamp = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.post('/api/v1/bootcamps', formData, config);
    history.push('/manage-bootcamp');
  } catch (err) {
    dispatch({ type: BOOTCAMP_ERROR });
    dispatch(setAlert(err.response.data.error, 'danger'));
  }
};

export const getBootcampInRadius = ({ zipcode, distance }) => async (
  dispatch
) => {
  dispatch({ type: CLEAR_BOOTCAMPS });
  try {
    const res = await axios.get(
      `/api/v1/bootcamps/radius/${zipcode}/${distance}`
    );
    dispatch({
      type: GET_BOOTCAMP_IN_RADIUS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: BOOTCAMP_ERROR });
    dispatch(setAlert(err.response.data.error, 'danger'));
  }
};

export const filteredBootcamps = ({ averageRating, averageCost }) => async (
  dispatch
) => {
  dispatch({ type: CLEAR_BOOTCAMPS });
  try {
    const res = await axios.get(
      `/api/v1/bootcamps?averageRating[gte]=${averageRating}&averageCost[gte]=${averageCost}`
    );
    dispatch({
      type: FITERED_BOOTCAMPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: BOOTCAMP_ERROR });
  }
};
