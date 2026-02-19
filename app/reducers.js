/*
Combine all reducers in this file and export the combined reducers.
*/

import { enableAllPlugins } from 'immer';
import { combineReducers } from 'redux';

import repos from './containers/Repos/reducer';
import info from './containers/Info/reducer';
import theme from './containers/Theme/reducer';
import auth from './containers/Auth/reducer';
import search from './containers/Search/reducer';
import musicPlayer from './containers/MusicPlayer/reducer';
import home from './containers/Home/reducer';

enableAllPlugins();

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    ...injectedReducer,
    repos,
    info,
    theme,
    auth,
    search,
    musicPlayer,
    home
  });

  return rootReducer;
}
