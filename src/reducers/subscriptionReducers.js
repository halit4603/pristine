import _ from 'lodash';
import { FETCH_SUBS_ERROR, FETCH_SUBS_SUCCESS, FETCH_STREAM_SUCCESS } from '../actions/types';

export function subsError(state = false, action) {
  switch (action.type) {
    case FETCH_SUBS_ERROR:
      return action.err;
    default:
      return state;
  }
}

export function subscriptions(state = {}, action) {
  switch (action.type) {
    case FETCH_SUBS_SUCCESS:
      return action.payload.data.reduce((map, sub) => {
        map[sub.id] = sub;
        return map;
      }, {});
    case FETCH_STREAM_SUCCESS:
      return {
        ...state,
        [action.payload.data.id]: {
          ...state[action.payload.data.id],
          ...{
            stream: [...action.payload.data.items],
            streamUpdated: action.payload.data.updated,
            streamContinuation: action.payload.data.continuation
          }
        }
      };
    default:
      return state;
  }
}
