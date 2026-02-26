import get from 'lodash/get';
import { translateError } from './index';

export const PAYLOAD = {
  DATA: 'data',
  LOADING: 'loading',
  ERROR: 'error'
};
export const startLoading = (draft) => {
  draft[PAYLOAD.LOADING] = true;
};

export const stopLoading = (draft) => {
  draft[PAYLOAD.LOADING] = false;
};

export const setData = (draft, action, key = PAYLOAD.DATA, defaultValue = null) => {
  draft[key] = get(action, key, defaultValue);
};

export const setError = (draft, action) => {
  const error = get(action, PAYLOAD.ERROR, 'something_went_wrong');
  draft[PAYLOAD.ERROR] = translateError(error);
};
