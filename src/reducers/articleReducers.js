import { MISREAD_SUCCESS, READ_SUCCESS } from '../actions/types';

export function article(state = {}, action) {
  switch (action.type) {
    case MISREAD_SUCCESS:
      return action.payload.id;
    case READ_SUCCESS:
      return action.payload.id;
    default:
      return state;
  }
}
