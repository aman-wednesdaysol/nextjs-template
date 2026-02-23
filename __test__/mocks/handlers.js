import { API_LOGIN_SUCCESS, API_LOGIN_FAILURE, API_SIGNUP_SUCCESS, API_SIGNUP_FAILURE, API_SONGS } from './data';

const json = (data, status = 200) => ({
  status,
  contentType: 'application/json',
  body: JSON.stringify(data)
});

const API = 'http://localhost:9000';

export const mockLoginSuccess = (page) => page.route(`${API}/login`, (route) => route.fulfill(json(API_LOGIN_SUCCESS)));

export const mockLoginFailure = (page) =>
  page.route(`${API}/login`, (route) => route.fulfill(json(API_LOGIN_FAILURE, 401)));

export const mockSignupSuccess = (page) =>
  page.route(`${API}/signup`, (route) => route.fulfill(json(API_SIGNUP_SUCCESS)));

export const mockSignupFailure = (page) =>
  page.route(`${API}/signup`, (route) => route.fulfill(json(API_SIGNUP_FAILURE, 400)));

export const mockSearchSongs = (page, songs = API_SONGS) =>
  page.route(
    (url) => url.href.includes('/music/resources/songs') && url.href.includes('term='),
    (route) => route.fulfill(json(songs))
  );

export const mockTrackDetail = (page, track) =>
  page.route(
    (url) => /\/music\/resources\/songs\/\d+$/.test(url.pathname),
    (route) => route.fulfill(json(track))
  );

export const mockTrackDetailError = (page) =>
  page.route(
    (url) => /\/music\/resources\/songs\/\d+$/.test(url.pathname),
    (route) => route.fulfill(json({ message: 'Not found' }, 500))
  );

export const mockLibrary = (page, songs = []) =>
  page.route(`${API}/music/library`, (route) => {
    if (route.request().method() === 'GET') {
      return route.fulfill(json(songs));
    }
    return route.continue();
  });

export const mockLikeSong = (page) =>
  page.route(`${API}/music/library/like`, (route) => route.fulfill(json({ success: true })));

export const mockUnlikeSong = (page) =>
  page.route(
    (url) => /\/music\/library\/unlike\/\d+$/.test(url.pathname),
    (route) => route.fulfill(json({ success: true }))
  );
