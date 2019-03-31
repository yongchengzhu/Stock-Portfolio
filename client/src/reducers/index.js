import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import stocks from './stocks';

export default combineReducers({
  auth: auth,
  stocks: stocks,
  form: formReducer
});