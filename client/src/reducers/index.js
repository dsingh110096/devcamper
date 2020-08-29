import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import bootcamp from './bootcamp';
import review from './review';

export default combineReducers({
  alert,
  auth,
  bootcamp,
  review,
});
