import { combineReducers } from 'redux';
import { subscriptions, subsError } from './subscriptionReducers';
import { activeStream, streamError } from './streamReducers';
import { article } from './articleReducers';
import { loading } from './loadingReducer';
import { mastermix } from './mastermixReducer';

const rootReducer = combineReducers({
  subsError,
  subscriptions,
  streamError,
  activeStream,
  article,
  loading,
  mastermix
});

export default rootReducer;
