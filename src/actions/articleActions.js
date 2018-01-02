import { MISREAD_ARTICLE, READ_SUCCESS, APICALL } from './types';

export function misreadArticle(article) {
  return {
    type: APICALL,
    payload: {
      ...article,
      ...MISREAD_ARTICLE,
      request: {
        url: article.alternate[0].href,
        method: 'get',
        headers: {
          'content-type': 'text/html'
        }
      }
    }
  };
}

export function readArticle(article) {
  return {
    type: READ_SUCCESS,
    payload: article
  };
}
