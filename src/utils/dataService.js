import axios from 'axios';

import { LOADING } from '../actions/types';

const dataService = ({ dispatch }) => next => action => {
  if (action.type !== 'APICALL') {
    return next(action);
  }
  if (action.payload.load) {
    dispatch({ type: LOADING });
  }
  console.log(action);
  const { payload } = action;

  axios(payload.request)
    .then(res => {
      const data = res.data;
      return dispatch({
        type: payload.success,
        payload: {
          ...payload,
          data
        }
      });
    })
    .catch(err => {
      dispatch({
        type: payload.error,
        err
      });
    });
};

export default dataService;
