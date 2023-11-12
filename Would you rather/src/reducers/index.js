import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import users from './users';
import questions from './ques';
import authenticatedUser from './authenticatedUser';

export default combineReducers({
  users,
  questions,
  authenticatedUser,
  loadingBar: loadingBarReducer,
});
