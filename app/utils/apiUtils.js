import { create } from 'apisauce';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import { mapKeysDeep } from './index';
import { getStoredToken } from './authUtils';

const apiClients = {
  github: null,
  music: null,
  default: null
};

function resolveClientKey(type) {
  if (type === 'music') return 'music';
  if (type === 'github') return 'github';
  return 'default';
}

function resolveBaseURL(key) {
  if (key === 'music') return 'http://localhost:9000';
  return process.env.NEXT_PUBLIC_GITHUB_URL;
}

export const getApiClient = (type = 'github') => apiClients[type];

export const generateApiClient = (type = 'github') => {
  const key = resolveClientKey(type);
  if (!apiClients[key]) {
    apiClients[key] = createApiClientWithTransForm(resolveBaseURL(key));
  }
  return apiClients[key];
}; // complexity: 2

export const createApiClientWithTransForm = (baseURL) => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });

  api.addRequestTransform((request) => {
    const token = getStoredToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    if (request.data) {
      request.data = mapKeysDeep(request.data, (key) => snakeCase(key));
    }
    return request;
  });

  api.addResponseTransform((response) => {
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, (key) => camelCase(key));
    }
    return response;
  });

  return api;
};