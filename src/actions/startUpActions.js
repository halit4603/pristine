//import Config from 'react-native-config';
import { FETCH_MASTERMIX, APICALL } from './types';
import { LOCALFEEDLYAPI, FEEDLYDEVTOKEN } from '../../env';

export function fetchMastermix() {
  return {
    type: APICALL,
    payload: {
      ...FETCH_MASTERMIX,
      request: {
        url: `${LOCALFEEDLYAPI}/mixes`,
        method: 'get',
        headers: {
          Authorization: FEEDLYDEVTOKEN
        }
      }
    }
  };
}
