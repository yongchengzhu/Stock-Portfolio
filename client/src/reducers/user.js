import { FETCH_BALANCE, BUY_STOCK, BUY_ERR } from '../actions/types';

const INITIAL_STATE = {
  balance: null,
  errorMessage: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BALANCE:
      return { ...state, balance: action.payload }

    case BUY_STOCK:
      return { ...state, balance: action.payload, errorMessage: '' }

    case BUY_ERR:
      return { ...state, errorMessage: action.payload }

    default:
      return state;
  }
}