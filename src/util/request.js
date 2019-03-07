import axios from 'axios';

/**
 * @method Request
 * @param {object} configs
 *
 * @return {promise}
 */

const Request = (configs = {}) => {
  const baseUrl = configs.baseUrl;
  const url = baseUrl + configs.path;
  const localDefaultHeaders = '{}';
  const defaultHeaders = JSON.parse(localDefaultHeaders);
  const headers = { ...configs.headers, ...defaultHeaders };
  configs = { ...configs, headers, url };
  return axios(configs);
};

export const GET = (path, configs = {}) =>
  Request({ ...configs, path, method: 'GET' });
export const POST = (path, configs = {}) =>
  Request({ ...configs, path, method: 'POST' });
export const PUT = (path, configs = {}) =>
  Request({ ...configs, path, method: 'PUT' });
export const PATCH = (path, configs = {}) =>
  Request({ ...configs, path, method: 'PATCH' });
export const DELETE = (path, configs = {}) =>
  Request({ ...configs, path, method: 'DELETE' });

export default Request;
