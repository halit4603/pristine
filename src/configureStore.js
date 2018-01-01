import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import dataService from './utils/dataService';
import misreaderService from './utils/misreaderService';
import rootReducer from './reducers';

const logger = createLogger({ collapsed: true });

export default function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(dataService, misreaderService, logger))
  );
}
