/**
 * Authentication API service
 */
import { generateApiClient } from '@utils/apiUtils';

const authApi = generateApiClient('music');

/**
 * Sign up a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} API response
 */
export const signup = async (email, password) => {
  const response = await authApi.post('/signup', { email, password });
  return response;
};

/**
 * Log in a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} API response
 */
export const login = async (email, password) => {
  const response = await authApi.post('/login', { email, password });
  return response;
};
