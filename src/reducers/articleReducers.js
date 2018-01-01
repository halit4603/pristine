import { MISREAD_SUCCESS } from '../actions/types';

export function article(state = {}, action) {
  switch (action.type) {
    case MISREAD_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
