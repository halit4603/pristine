import { FETCH_SUBS, APICALL, FETCH_COUNTS } from './types';
import { FEEDLYAPI, LOCALFEEDLYAPI, FEEDLYDEVTOKEN } from '../../env';

export function fetchSubs() {
  return {
    type: APICALL,
    payload: {
      ...FETCH_SUBS,
      request: {
        url: `${FEEDLYAPI}/v3/subscriptions`,
        method: 'get',
        headers: {
          Authorization: FEEDLYDEVTOKEN
        }
      }
    }
  };
}

export function fetchCounts() {
  return {
    type: APICALL,
    payload: {
      ...FETCH_COUNTS,
      request: {
        url: `${LOCALFEEDLYAPI}/v3/markers/counts`,
        method: 'get',
        headers: {
          Authorization: FEEDLYDEVTOKEN
        }
      }
    }
  };
}

/*

function combineSubsAndCounts(res) {
  const countData = res[0].data.unreadcounts;
  const subs = res[1].data;
  const foundIndex = id => countData.find(item => item.id === id);
  const subscriptions = subs.map(item => {
    return { ...item, ...foundIndex(item.id) };
  });
  return subscriptions;
}
*/
