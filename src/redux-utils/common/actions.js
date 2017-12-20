import Request from 'helpers/Request';
import { uploadAPI, uploadUnAuthAPI, assetAPI, assetPropertyAPI, accountAPI } from 'constants/apiURL';
import * as Types from './constants';
import { userRoleList } from './common-data';

export function upload(data = { file: {}, type: 'media' }, params = {}) {
    const { file, type } = data;
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_UPLOAD_FILE
        });
        return Request.makeUpload(`${uploadAPI}/${type}`, file, params).then(res => {
            dispatch({
                type: Types.SUCCESS_REQUEST_UPLOAD_FILE,
                payload: res.data
            });
            return res;
        });
    };
}

export function removeAsset(id, params = {}) {
    return dispatch => {
        return Request.makeDelete(`${assetAPI}/${id}`, params).then(res => {
            return res;
        });
    };
}

export function removeAssetProperty(id, params = {}) {
    return dispatch => {
        return Request.makeDelete(`${assetPropertyAPI}/${id}`, params).then(res => {
            return res;
        });
    };
}

export function uploadUnAuth(data = { file: {} }, params = {}) {
    const { file } = data;
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_UPLOAD_FILE
        });
        return Request.makeUpload(uploadUnAuthAPI, file, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_UPLOAD_FILE,
                    payload: res.data
                });
                return res;
            })
            .catch(error => {
                dispatch({
                    type: Types.ERROR_REQUEST_UPLOAD_FILE,
                    payLoad: error.data
                });
                throw error;
            });
    };
}

export function checkEmailExits(params = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_CHECK_EMAIL_EXITS
        });
        return Request.makeGet(`${accountAPI}/email-exits`, params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_REQUEST_CHECK_EMAIL_EXITS,
                    payload: res.data
                });
                return res;
            })
            .catch(error => {
                dispatch({
                    type: Types.ERROR_REQUEST_CHECK_EMAIL_EXITS,
                    payLoad: error.data
                });
                throw error;
            });
    };
}

export function getConfig(params) {
    return dispatch => {
        return new Promise(resolve => {
            setTimeout(() => {
                dispatch({
                    type: Types.FETCH_CONFIG_SUCCESS,
                    payload: { userRoleList }
                });
                resolve(true);
            }, 2000);
        });
    };
}
