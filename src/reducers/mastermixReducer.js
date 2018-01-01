import { FETCH_MASTERMIX_ERROR, FETCH_MASTERMIX_SUCCESS } from '../actions/types';

export function mastermixError(state = false, action) {
  switch (action.type) {
    case FETCH_MASTERMIX_ERROR:
      return action.err;
    default:
      return state;
  }
}

export function mastermix(state = {}, action) {
  switch (action.type) {
    case FETCH_MASTERMIX_SUCCESS:
      return action.data;
    default:
      return state;
  }
}
