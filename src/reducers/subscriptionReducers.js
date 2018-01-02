import { orderBy } from 'lodash';
import {
  FETCH_SUBS_ERROR,
  FETCH_SUBS_SUCCESS,
  FETCH_STREAM_SUCCESS,
  FETCH_COUNTS_SUCCESS,
  MISREAD_SUCCESS
} from '../actions/types';

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
    case FETCH_COUNTS_SUCCESS:
      const foundIndex = id => action.payload.find(item => item.id === id);
      const newSubsData = state.map(item => {
        return {
          ...item,
          ...foundIndex(item.id)
        };
      });
      return newSubsData;
    case FETCH_STREAM_SUCCESS:
      const streamMap = action.payload.data.items.reduce((map, article) => {
        map[article.id] = article;
        return map;
      }, {});
      return {
        ...state,
        [action.payload.data.id]: {
          ...state[action.payload.data.id],
          ...{
            stream: streamMap,
            streamUpdated: action.payload.data.updated,
            streamContinuation: action.payload.data.continuation
          }
        }
      };
    case MISREAD_SUCCESS:
      return {
        ...state,
        [action.payload.origin.streamId]: {
          ...state[action.payload.origin.streamId],
          stream: {
            ...state[action.payload.origin.streamId].stream,
            [action.payload.id]: {
              ...state[action.payload.origin.streamId].stream[action.payload.id],
              ...{
                misreadContent: action.payload.data
              }
            }
          }
        }
      };
    default:
      return state;
  }
}
