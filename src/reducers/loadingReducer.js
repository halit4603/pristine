import {
  FETCH_SUBS_SUCCESS,
  FETCH_SUBS_ERROR,
  FETCH_STREAM_SUCCESS,
  FETCH_STREAM_ERROR,
  FETCH_MASTERMIX_SUCCESS,
  FETCH_MASTERMIX_ERROR,
  MISREAD_SUCCESS,
  MISREAD_ARTICLE_ERROR,
  MISREAD_ARTICLE,
  LOADING
} from '../actions/types';

export function loading(state = false, action) {
  switch (action.type) {
    case LOADING:
      return true;
    case FETCH_SUBS_SUCCESS:
      return false;
    case FETCH_SUBS_ERROR:
      return false;
    case FETCH_STREAM_SUCCESS:
      return false;
    case FETCH_STREAM_ERROR:
      return false;
    case FETCH_MASTERMIX_SUCCESS:
      return false;
    case FETCH_MASTERMIX_ERROR:
      return false;
    case MISREAD_ARTICLE:
      return true;
    case MISREAD_SUCCESS:
      return false;
    case MISREAD_ARTICLE_ERROR:
      return false;
    default:
      return state;
  }
}
