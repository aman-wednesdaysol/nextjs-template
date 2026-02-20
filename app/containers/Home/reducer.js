/*
 *
 * Home reducer
 *
 */
import { PAYLOAD, startLoading, stopLoading, setError, setData } from '@app/utils/reducer';
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const HOME_PAYLOAD = {
  COUNTRY: 'country'
};

export const initialState = {
  [HOME_PAYLOAD.COUNTRY]: null,
  [PAYLOAD.DATA]: [],
  [PAYLOAD.ERROR]: null
};

export const { Types: homeActionTypes, Creators: homeActionCreators } = createActions({
  requestTrendingTracks: [HOME_PAYLOAD.COUNTRY],
  successTrendingTracks: [PAYLOAD.DATA],
  failureTrendingTracks: [PAYLOAD.ERROR],
  setCountry: [HOME_PAYLOAD.COUNTRY]
});

export const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case homeActionTypes.REQUEST_TRENDING_TRACKS:
        startLoading(draft);
        draft[HOME_PAYLOAD.COUNTRY] = action.country;
        draft[PAYLOAD.ERROR] = null;
        break;
      case homeActionTypes.SUCCESS_TRENDING_TRACKS:
        stopLoading(draft);
        setData(draft, action);
        break;
      case homeActionTypes.FAILURE_TRENDING_TRACKS:
        stopLoading(draft);
        setError(draft, action);
        break;
      case homeActionTypes.SET_COUNTRY:
        draft[HOME_PAYLOAD.COUNTRY] = action.country;
        break;
      default:
        break;
    }
  });

export default homeReducer;
