import {
  GET_ALL_BOOTCAMPS,
  BOOTCAMP_ERROR,
  GET_SINGLE_BOOTCAMP,
} from '../actions/types';

const initialState = {
  bootcamps: [],
  bootcamp: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_BOOTCAMPS:
      return {
        ...state,
        bootcamps: payload,
        loading: false,
      };
    case GET_SINGLE_BOOTCAMP:
      return {
        ...state,
        bootcamp: payload.data,
        loading: false,
      };
    case BOOTCAMP_ERROR:
      return {
        ...state,
        bootcamps: [],
        bootcamp: null,
        loading: false,
      };
    default:
      return state;
  }
}
