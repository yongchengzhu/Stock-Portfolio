import server from '../apis/server';
import iex from '../apis/iex';
import { AUTH_USER, AUTH_ERR, FETCH_STOCKS, FETCH_BALANCE } from './types';

//------------------------------------------------------------------------------------------------
// Authentication Actions
//------------------------------------------------------------------------------------------------
export const signup = ({ name, email, password }, callback) => {
  return async (dispatch) => {
    try {
      const params = {
        name: name,
        email: email,
        password: password
      };

      const response = await server.post('/signup', params);

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
      const params = {
        email: email,
        password: password
      };

      const response = await server.post('/signin', params);

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

//------------------------------------------------------------------------------------------------
// IEX Stock Actions
//------------------------------------------------------------------------------------------------

export const fetchStocks = () => {
  return async (dispatch) => {
    const response = await iex.get('/stock/market/batch?symbols=aapl,stwd,nflx,msft,t&types=quote');

    dispatch({ type: FETCH_STOCKS, payload: response.data });
  }
}

//------------------------------------------------------------------------------------------------
// User Actions
//------------------------------------------------------------------------------------------------

export const fetchBalance = () => {
  return async (dispatch, getState) => {
    const { authenticated } = getState().auth;

    const response = await server.get('/balance', { headers: { "authorization":  authenticated } });

    dispatch({ type: FETCH_BALANCE, payload: response.data.balance })
  }
}