import Crux from '../native_modules';

const misreaderService = ({ dispatch }) => next => action => {
  if (action.type !== 'MISREAD_ARTICLE_SUCCESS') {
    return next(action);
  }
  const { payload } = action;
  Crux.misread(payload.alternate[0].href, payload.data, article =>
    dispatch({ type: 'MISREAD_SUCCESS', payload: { ...payload, data: article } })
  );
};

export default misreaderService;
