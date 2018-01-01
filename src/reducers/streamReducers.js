import { FETCH_STREAM_ERROR, SELECT_ACTIVE_STREAM } from '../actions/types';

export function streamError(state = false, action) {
  switch (action.type) {
    case FETCH_STREAM_ERROR:
      return action.err;
    default:
      return state;
  }
}

//export function streamContent(state = {}, action) {
//  switch (action.type) {
//    case FETCH_STREAM_SUCCESS:
//      return action.payload.data;
//    default:
//      return state;
//  }
//}

export function activeStream(state = {}, action) {
  switch (action.type) {
    case SELECT_ACTIVE_STREAM:
      return action.payload;
    default:
      return state;
  }
}
