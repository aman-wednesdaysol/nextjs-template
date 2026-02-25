import { create } from 'apisauce';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import { mapKeysDeep } from './index';

const apiClients = {
  github: null,
  default: null,
  auth: null,
  music: null
};

export const getApiClient = (type = 'github') => apiClients[type];
export const generateApiClient = (type = 'github') => {
  switch (type) {
    case 'github':
      apiClients[type] = createApiClientWithTransForm(process.env.NEXT_PUBLIC_GITHUB_URL);
      return apiClients[type];
    case 'auth':
      apiClients[type] = createApiClientWithTransForm(process.env.NEXT_PUBLIC_GITHUB_URL);
      return apiClients[type];
    case 'music':
      apiClients[type] = createApiClientWithTransForm('http://localhost:9000');
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(process.env.NEXT_PUBLIC_GITHUB_URL);
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = (baseURL) => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  api.addResponseTransform((response) => {
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, (keys) => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform((request) => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, (keys) => snakeCase(keys));
    }
    return request;
  });
  return api;
};

export const setAuthHeader = (type, token) => {
  const client = apiClients[type];
  if (client) {
    client.setHeader('Authorization', `Bearer ${token}`);
  }
};
