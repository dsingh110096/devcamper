import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import scrollToTop from '../utils/scrollToTop';

//Using dispatch we can dispatch more than one action type at a time
export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  //Dispatching data to the alert reducer
  scrollToTop();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  //Removing alert
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 2000);
};
