import { GET_REVIEWS, REVIEW_ERROR } from './types';
import axios from 'axios';
import { getSingleBootcamp } from '../actions/bootcamp';
import { setAlert } from './alert';
import scrollToTop from '../utils/scrollToTop';

export const getReviewsByBootcamp = (bootcampId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${bootcampId}/reviews`);
    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    });
    dispatch(getSingleBootcamp(bootcampId));
  } catch (err) {
    dispatch({ type: REVIEW_ERROR });
  }
};
export const addReviewToBootcamp = (formData, bootcampId, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.post(
      `/api/v1/bootcamps/${bootcampId}/reviews`,
      formData,
      config
    );
    dispatch(getReviewsByBootcamp(bootcampId));
    dispatch(getSingleBootcamp(bootcampId));
    scrollToTop();
    dispatch(setAlert('Review Added Successfully', 'success'));
    history.push(`/bootcamps/${bootcampId}`);
  } catch (err) {
    scrollToTop();
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({ type: REVIEW_ERROR });
  }
};
