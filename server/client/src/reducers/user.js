import { FETCH_TRANSACTIONS, FETCH_BALANCE, FETCH_OWNED, BUY_STOCK, BUY_ERR } from '../actions/types';

const INITIAL_STATE = {
  balance: null,
  errorMessage: '',
  owned: {},
  transactions: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      return { ...state, transactions: action.payload.transactions }

    case FETCH_BALANCE:
      return { ...state, balance: action.payload.balance }

    case FETCH_OWNED:
      return { ...state, owned: action.payload.owned }

    case BUY_STOCK:
      return { ...state, balance: action.payload.balance, errorMessage: '', owned: action.payload.owned }

    case BUY_ERR:
      return { ...state, errorMessage: action.payload }

    default:
      return state;
  }
}