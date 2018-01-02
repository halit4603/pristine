import { APICALL, FETCH_COUNTS } from './types';
import { FEEDLYAPI } from '../../env';

export function counts() {
  return {
    type: APICALL,
    payload: {
      ...FETCH_COUNTS,
      request: {
        url: `${FEEDLYAPI}/v3/markers/counts`,
        method: 'get'
      }
    }
  };
}
