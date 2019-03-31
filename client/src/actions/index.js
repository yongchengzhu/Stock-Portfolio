import axios from 'axios';

import { AUTH_USER } from './types';

export const signup = ({ name, email, password }) => {
  return (dispatch) => {
    axios.post('http://localhost:3090/signup', {
      name: name,
      email: email,
      password: password
    });
  }
};