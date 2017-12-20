import * as Types from './constants';
import { langEn, langVi } from './fake-lang-data';
import Request from 'helpers/Request';
import { languageAPI, localeAPI } from 'constants/apiURL';

export function getLanguages(params = {}) {
    return dispatch => {
        return Request.makeGet(`${localeAPI}/translate`, params).then(res => {
            dispatch({
                type: Types.FETCH_LANGUAGE_SUCCESS,
                payload: { data: res.data.data }
            });
            return res;
        });
    };
}

export function changeLanguage(lang = '') {
    return dispatch => {
        localStorage.setItem('locale', lang);
        dispatch({
            type: Types.ON_CHANGE_LANGUAGE,
            payload: lang
        });
    };
}

export function getListLanguage(params = {}) {
    return dispatch => {
        return Request.makeGet(`${languageAPI}`, params).then(res => {
            dispatch({
                type: Types.FETCH_LIST_LANGUAGE_SUCCESS,
                payload: {
                    data: res.data.data,
                    isFetching: false
                }
            });
            return res;
        });
    };
}

export function getLanguage(id, params = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_FETCH_LANGUAGE_INFO
        });
        return Request.makeGet(`${languageAPI}/${id}`).then(res => {
            const languages = parseInt(id, 0) === 1 ? langEn : langVi;
            dispatch({
                type: Types.SUCCESS_FETCH_LANGUAGE_INFO,
                payload: Object.assign({}, res.data.data, { languages })
            });
            return res;
        });
    };
}

export function createLanguage(data = {}, params = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_REQUEST_CREATE_LANGUAGE
        });
        return Request.makePost(`${languageAPI}`, data, params).then(res => {
            return res;
        });
    };
}

export function deleteLanguage(id, params = {}) {
    return dispatch => {
        return Request.makeDelete(`${languageAPI}/${id}`, params);
    };
}

export function updateLanguage(id, data = {}, params = {}) {
    return dispatch => {
        return Request.makePut(`${languageAPI}/${id}`, data, params);
    };
}

// Translate
export function getListTranslate(params = {}) {
    return dispatch => {
        return Request.makeGet(`${localeAPI}`, params).then(res => {
            dispatch({
                type: Types.FETCH_LIST_TRANSLATE_SUCCESS,
                payload: {
                    data: res.data.data,
                    isFetching: false
                }
            });
            return res;
        });
    };
}

export function createTranslate(data = {}, params = {}) {
    return dispatch => {
        return Request.makePost(`${localeAPI}`, data, params);
    };
}

export function getTranslate(id, params = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_FETCH_TRANSLATE_INFO
        });
        return Request.makeGet(`${localeAPI}/${id}/translate`).then(res => {
            dispatch({
                type: Types.SUCCESS_FETCH_TRANSLATE_INFO,
                payload: res.data.data
            });
            return res;
        });
    };
}

export function updateTranslate(id, data = {}, params = {}) {
    return dispatch => {
        return Request.makePut(`${localeAPI}/${id}/translate`, data).then(res => {
            return res;
        });
    };
}
