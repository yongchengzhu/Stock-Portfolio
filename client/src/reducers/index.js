import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import stocks from './stocks';
import user from './user';

export default combineReducers({
  auth: auth,
  stocks: stocks,
  user: user,
  form: formReducer
});