/* eslint no-console: 0 */
// import queryString from 'query-string';
import axios, { CancelToken } from 'axios';
import _ from 'lodash';
// import createBrowserHistory from 'history/createBrowserHistory';

import { BASE_URL } from './../constants/config';
// import Logger from './Logger';

// const history = createBrowserHistory();

class Request {
    constructor() {
        this.token = '';
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            this.token = token;
            Object.assign(headers, {
                Authorization: `Bearer ${this.token}`
            });
        }

        this.axios = axios.create({
            baseURL: BASE_URL,
            timeout: 30000,
            headers,
            responseType: 'json',
            transformResponse: [
                (data, headers) => {
                    if (data) {
                        if (!data.hasOwnProperty('success') || data.success) return data;
                        else {
                            const err = { response: { data } };
                            throw err;
                        }
                    } else {
                        const err = { code: 404, message: 'NotFound' };
                        throw err;
                    }
                }
            ],
            validateStatus: status => {
                if (status === 403) {
                    window.location = `${window.location.origin}/#/403`;
                } else {
                    return status >= 200 && status < 300; // default
                }
            },
            onUploadProgress: progressEvent => {
                // Do whatever you want with the native progress event
                // Logger.log('onUploadProgress', progressEvent);
            },
            onDownloadProgress: progressEvent => {
                // Do whatever you want with the native progress event
                // Logger.log('onDownloadProgress', progressEvent);
            }
        });

        this.axios.interceptors.request.use(
            config => {
                // Do something before request is sent
                return config;
            },
            error => {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        this.axios.interceptors.response.use(
            response => {
                // Do something with response data
                return response;
            },
            error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    return Promise.reject(error.response);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    return Promise.reject(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    return Promise.reject(error);
                }
            }
        );
    }

    setToken(token = '') {
        localStorage.setItem('accessToken', token);
        this.token = token;
        this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        this.axios.defaults.headers.Authorization = `Bearer ${this.token}`;
    }

    clearToken() {
        localStorage.removeItem('accessToken');
        this.token = '';
        delete this.axios.defaults.headers.common.Authorization;
        delete this.axios.defaults.headers.Authorization;
    }

    _onError = error => {
        // throw error;
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw error.response;
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            throw error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            throw error;
        }
    };

    _mapConfig = config => {
        if (config.ignoreAuth) {
            config.validateStatus = status => {
                return status >= 200 && status < 300; // default
            };
        }
        return config;
    };

    cancelToken() {
        return CancelToken.source();
    }

    makeRequest(config = {}) {
        config = this._mapConfig(config);
        this.axios.request(config).catch(this._onError);
    }

    makePost(url, data = {}, config = {}) {
        config = this._mapConfig(config);
        return this.axios.post(url, data, config).catch(this._onError);
    }

    makePut(url, data = {}, config = {}) {
        config = this._mapConfig(config);
        return this.axios.put(url, data, config).catch(this._onError);
    }

    makePatch(url, data = {}, config = {}) {
        config = this._mapConfig(config);
        return this.axios.patch(url, data, config).catch(this._onError);
    }

    makeGet(url, params = {}, config = {}) {
        config = this._mapConfig(config);
        Object.assign(config, {
            params
        });
        return this.axios.get(url, config).catch(this._onError);
    }

    makeDelete(url, params = {}, config = {}) {
        config = this._mapConfig(config);
        Object.assign(config, {
            params
        });
        return this.axios.delete(url, config).catch(this._onError);
    }

    makeUpload(url, file, params = {}) {
        params = this._mapConfig(params);
        params = Object.assign({ timeout: 300000 }, params);
        params = _.omit(params, ['Content-Type']);
        const data = new FormData();
        data.append('file', file);
        return this.axios.post(url, data, params).catch(this._onError);
    }
}

export default new Request();
