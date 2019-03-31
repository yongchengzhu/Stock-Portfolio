import axios from 'axios';

import iex from '../apis/iex';

import { AUTH_USER, AUTH_ERR, FETCH_STOCKS } from './types';

export const signup = ({ name, email, password }, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3090/signup', {
          name: name,
          email: email,
          password: password
      });

      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem('token', response.data.token);
      callback();
    } catch (e) {
      dispatch({ type: AUTH_ERR, payload: 'Email is in use.' });
    }
  }
};

export const signin = ({ email, password }, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3090/signin', {
        email: email,
        password: password
      });

      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem('token', response.data.token);
      callback();
    } catch (e) {
      dispatch({ type: AUTH_ERR, payload: 'Invalid login credentials.' })
    }
  }
};

export const signout = () => {
  localStorage.removeItem('token');
  
  return {
    type: AUTH_USER,
    payload: ''
  }
}

export const fetchStocks = () => {
  return async (dispatch) => {
    const response = await iex.get('/stock/market/batch?symbols=aapl,stwd,nflx,msft,t&types=quote');

    dispatch({ type: FETCH_STOCKS, payload: response.data });
  }
}