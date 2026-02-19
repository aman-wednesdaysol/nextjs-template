/**
 * Authentication utility functions for JWT token management
 */

const TOKEN_KEY = 'music_app_token';
const USER_KEY = 'music_app_user';

const base64UrlDecode = (str) => {
  // base64url -> base64
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  // pad
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  if (typeof window !== 'undefined' && window.atob) {
    return window.atob(padded);
  }
  // Fallback (should not happen in browser)
  return Buffer.from(padded, 'base64').toString('utf8');
};

export const decodeJwtPayload = (jwt) => {
  try {
    if (!jwt) return null;
    const [, payload] = jwt.split('.');
    if (!payload) return null;
    const json = base64UrlDecode(payload);
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const parseAuthHash = (hash) => {
  if (!hash) return null;
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!raw) return null;
  const params = new URLSearchParams(raw);
  const accessToken = params.get('access_token');
  if (!accessToken) return null;
  return {
    accessToken,
    refreshToken: params.get('refresh_token'),
    tokenType: params.get('token_type'),
    expiresIn: params.get('expires_in'),
    expiresAt: params.get('expires_at'),
    type: params.get('type')
  };
};

/**
 * Get stored JWT token from localStorage
 * @returns {string|null} The JWT token or null
 */
export const getStoredToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Store JWT token in localStorage
 * @param {string} token - The JWT token to store
 */
export const setStoredToken = (token) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Remove JWT token from localStorage
 */
export const removeStoredToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Get stored user from localStorage
 * @returns {object|null} The user object or null
 */
export const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Store user in localStorage
 * @param {object} user - The user object to store
 */
export const setStoredUser = (user) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
  return !!getStoredToken();
};
