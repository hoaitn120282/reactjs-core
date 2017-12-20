import Request from 'helpers/Request';
import { authAPI, meAPI, logoutAPI } from 'constants/apiURL';
import * as Types from './constants';

export function login(params, options) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_LOGIN
        });
        const data = Object.assign({ grant_type: 'password' }, params);
        return Request.makePost(authAPI, data)
            .then(res => {
                Request.setToken(res.data.data.access_token);
                dispatch({
                    type: Types.SUCCESS_REQUEST_LOGIN,
                    payload: {
                        user: res.data.data,
                        accessToken: res.data.data.access_token
                    }
                });
                return { success: true, message: 'Login Successfully !!!!' };
            })
            .catch(error => {
                dispatch({
                    type: Types.ERROR_REQUEST_LOGIN,
                    payLoad: error.data
                });
                throw error;
            });
    };
}

export function logout() {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_LOGOUT
        });
        return Request.makeGet(logoutAPI)
            .then(res => {
                Request.clearToken();
                dispatch({
                    type: Types.SUCCESS_REQUEST_LOGOUT,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: Types.ERROR_REQUEST_LOGOUT
                });
                throw err;
            });
    };
}

export function resetLogout() {
    return dispatch => {
        dispatch({
            type: Types.RESET_LOGOUT_REQUEST
        });
    };
}

export function me() {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_ME
        });
        return Request.makeGet(meAPI)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_ME,
                    payload: {
                        accessToken: Request.token,
                        user: res.data
                    }
                });
                return res;
            })
            .catch(err => {
                dispatch({
                    type: Types.ERROR_REQUEST_ME
                });
                throw err;
            });
    };
}

export function toggleFullPermission() {
    return dispatch => {
        dispatch({
            type: Types.TOGGLE_FULL_PERMISSION
        });
    };
}
