import Request from 'helpers/Request';
import { roleAPI, permissionAPI } from 'constants/apiURL';
import * as Types from './constants';

/**
 * Get list role
 *
 * @param {*} params
 */
export function getRoleList(params = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_FETCH_LIST_ROLE
        });
        Request.makeGet(roleAPI, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_FETCH_LIST_ROLE,
                    payload: res.data
                });
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_FETCH_LIST_ROLE,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_FETCH_LIST_ROLE,
                        payload: error.request
                    });
                }
            });
    };
}

/**
 * Create new Role
 *
 * @param {Object} data
 * @param {Object} params
 */
export function createRole(data = {}, params = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_CREATE_ROLE
        });
        return Request.makePost(roleAPI, data, params)
            .then(res => {
                dispatch({
                    type: Types.PUSH_ROLE_TO_LIST,
                    payload: res.data.data
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_CREATE_ROLE,
                        payload: error.response.data
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_CREATE_ROLE,
                        payload: error.request
                    });
                }
                throw error;
            });
    };
}

export function getPermissionByRole(roleId, params = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_FETCH_LIST_PERMISSION,
            payload: { roleId, data: {}, isFetching: true }
        });
        Request.makeGet(permissionAPI({ roleId }), params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_FETCH_LIST_PERMISSION,
                    payload: {
                        roleId,
                        data: res.data,
                        isFetching: false
                    }
                });
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_FETCH_LIST_PERMISSION,
                        payload: {
                            roleId,
                            data: error.response.data,
                            isFetching: false
                        }
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_FETCH_LIST_PERMISSION,
                        payload: {
                            roleId,
                            data: error.request,
                            isFetching: false
                        }
                    });
                }
            });
    };
}

export function getRoleById(roleId, params = {}) {
    return dispatch => {
        Request.makeGet(`${roleAPI}/${roleId}`, params).then(res => {
            dispatch({
                type: Types.SUCCESS_REQUEST_ROLE_INFO,
                payload: res.data
            });
        });
    };
}

export function removeRole(roleId, params = {}) {
    return dispatch => {
        Request.makeDelete(`${roleAPI}/${roleId}`, params).then(res => {
            dispatch({
                type: Types.SUCCESS_REQUEST_REMOVE_ROLE,
                payload: { id: roleId }
            });
        });
    };
}

export function updateRole(roleId, data = {}, params = {}) {
    return dispatch => {
        return Request.makePut(`${roleAPI}/${roleId}`, data, params).then(res => {
            dispatch({
                type: Types.SUCCESS_REQUEST_UPDATE_ROLE,
                payload: { id: roleId }
            });
            return res;
        });
    };
}

export function updatePermissionByRole(roleId, data = {}, params = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_UPDATE_PERMISSION,
            payload: { isFetching: true }
        });
        return Request.makePut(permissionAPI({ roleId }), data, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_UPDATE_PERMISSION,
                    payload: {
                        data: res.data,
                        isFetching: false
                    }
                });
                return res;
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: Types.ERROR_REQUEST_UPDATE_PERMISSION,
                        payload: {
                            data: error.response.data,
                            isFetching: false
                        }
                    });
                } else {
                    dispatch({
                        type: Types.FAIL_REQUEST_UPDATE_PERMISSION,
                        payload: {
                            data: error.request,
                            isFetching: false
                        }
                    });
                }
                throw error;
            });
    };
}
