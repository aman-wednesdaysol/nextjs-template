import { TOKEN_KEY, UID_KEY } from './constants';

const isBrowser = () => typeof window !== 'undefined';

export const getStoredToken = () => {
  if (!isBrowser()) {
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
};

export const setStoredToken = (token) => {
  if (!isBrowser()) {
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
};

export const setuid = (uid) => {
  if (!isBrowser()) {
    return;
  }
  localStorage.setItem(UID_KEY, uid);
};

export const getuid = () => {
  if (!isBrowser()) {
    return null;
  }
  return localStorage.getItem(UID_KEY);
};

export const clearStoredToken = () => {
  if (!isBrowser()) {
    return;
  }
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(UID_KEY);
};
