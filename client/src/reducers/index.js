import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import bootcamp from './bootcamp';

export default combineReducers({
  alert,
  auth,
  bootcamp,
});
