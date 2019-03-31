import { FETCH_BALANCE } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_BALANCE:
      return { ...state, balance: action.payload }

    default:
      return state;
  }
}