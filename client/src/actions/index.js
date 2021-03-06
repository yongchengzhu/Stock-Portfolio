import server from '../apis/server';
import iex from '../apis/iex';
import { AUTH_USER, AUTH_ERR, FETCH_TRANSACTIONS, FETCH_BALANCE, FETCH_OWNED, BUY_STOCK, BUY_ERR, FETCH_BATCH } from './types';

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
// User Actions
//------------------------------------------------------------------------------------------------

export const fetchTransactions = () => {
  return async (dispatch, getState) => {
    const { authenticated } = getState().auth;

    const response = await server.get('/transactions', { headers: { "authorization":  authenticated } });

    dispatch({ type: FETCH_TRANSACTIONS, payload: response.data })
  }
}

export const fetchBalance = () => {
  return async (dispatch, getState) => {
    const { authenticated } = getState().auth;

    const response = await server.get('/balance', { headers: { "authorization":  authenticated } });

    dispatch({ type: FETCH_BALANCE, payload: response.data })
  }
}

export const fetchOwned = () => {
  return async (dispatch, getState) => {
    const { authenticated } = getState().auth;

    const response = await server.get('/owned', { headers: { "authorization":  authenticated } });

    dispatch({ type: FETCH_OWNED, payload: response.data })
  }
}

export const buyStock = ({ ticker, quantity }) => {
  return async (dispatch, getState) => {
    const iexResponse = await iex.get('/query', { params: {
      function: "GLOBAL_QUOTE",
      symbol: ticker,
      apikey: "A86IFRDGA2JJDTAZ"
    } });
  
    const price = iexResponse.data["Global Quote"]["05. price"];
    const cost = price * quantity;
    const balance = getState().user.balance;

    if (cost > balance) {
      dispatch({ type: BUY_ERR, payload: 'Not enough balance for purchase.' });
    } else {
      const { authenticated } = getState().auth;
      const serverResponse = await server.post('/buy', { ticker: ticker, quantity: quantity, price: price }, { headers: { "authorization":  authenticated } });

      dispatch({ type: BUY_STOCK, payload: serverResponse.data })
    }
  }
}

//------------------------------------------------------------------------------------------------
// Stock Actions
//------------------------------------------------------------------------------------------------

export const fetchBatch = (batch) => {
  return async (dispatch, getState) => {
    // const response = await iex.get(`/stock/market/batch?symbols=${batch}&types=quote`);
    const response = await iex.get(`/query`, { params: {
      function: "BATCH_STOCK_QUOTES",
      apikey: "A86IFRDGA2JJDTAZ",
      symbols: batch
    } });
    console.log(response.data);
    const { authenticated } = getState().auth;
    await server.post('/update_owned', response.data, { headers: { "authorization":  authenticated } })

    dispatch({ type: FETCH_BATCH, payload: response.data })
  }
}
