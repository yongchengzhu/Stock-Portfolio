import { FETCH_BATCH } from '../actions/types';

const INITIAL_STATE = {
  batch: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BATCH:
      return { ...state, batch: action.payload };

    default:
      return state;
  }
}