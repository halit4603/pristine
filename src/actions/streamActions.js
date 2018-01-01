import { FETCH_STREAM, SELECT_ACTIVE_STREAM, APICALL } from './types';
import { LOCALFEEDLYAPI, FEEDLYAPI } from '../../env';

export function fetchStream(item) {
  return {
    type: APICALL,
    payload: {
      ...FETCH_STREAM,

      request: {
        url: `${FEEDLYAPI}/v3/streams/contents?streamId=${item.id}&count=200`,
        method: 'get'
      }
    }
  };
}

export function activeStream(stream) {
  return {
    type: SELECT_ACTIVE_STREAM,
    payload: stream
  };
}
