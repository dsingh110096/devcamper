import { GET_ALL_BOOTCAMPS, BOOTCAMP_ERROR } from './types';
import axios from 'axios';

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
