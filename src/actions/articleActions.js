import { MISREAD_ARTICLE, APICALL } from './types';

export function misreadArticle(article) {
  console.log(article.alternate[0].href);
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
