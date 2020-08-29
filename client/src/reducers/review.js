import { GET_REVIEWS, REVIEW_ERROR } from '../actions/types';

const initialState = {
  reviews: [],
  review: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload.data,
        loading: false,
      };
    case REVIEW_ERROR:
      return {
        ...state,
        reviews: [],
        review: null,
        loading: false,
      };
    default:
      return state;
  }
}
