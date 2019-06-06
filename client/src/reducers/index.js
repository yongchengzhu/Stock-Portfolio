import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import user from './user';
import stock from './stock';

export default combineReducers({
  auth: auth,
  user: user,
  stock: stock,
  form: formReducer
});