import * as Types from './constants';
import moment from 'moment';

const initState = {
    locale: localStorage.getItem('locale') || '',
    data: {},
    languageData: {
        data: []
    },
    languageInfo: {
        isFetching: false,
        data: {
            languages: []
        }
    },
    translateData: {
        data: []
    },
    translateInfo: {
        isFetching: false,
        data: {}
    }
};

export default function(state = initState, action = {}) {
    switch (action.type) {
        case Types.ON_CHANGE_LANGUAGE:
            switch (action.payload) {
                case 'en':
                case 'en_US':
                    moment.locale('en');
                    break;
                case 'vi':
                case 'vi_VN':
                    moment.locale('vi');
                    break;
                case 'zh':
                case 'zh_CN':
                    moment.locale('zh-cn');
                    break;
                default:
                    moment.locale('en');
                    break;
            }
            return Object.assign({}, state, {
                locale: action.payload
            });
        case Types.FETCH_LANGUAGE_SUCCESS:
            return Object.assign({}, state, {
                data: action.payload.data
            });

        case Types.FETCH_LIST_LANGUAGE_SUCCESS:
            return Object.assign({}, state, {
                languageData: action.payload
            });

        case Types.BEFORE_FETCH_LANGUAGE_INFO:
            return Object.assign({}, state, {
                languageInfo: Object.assign({}, state.languageInfo, { isFetching: true })
            });
        case Types.SUCCESS_FETCH_LANGUAGE_INFO:
            return Object.assign({}, state, {
                languageInfo: Object.assign({}, state.languageInfo, { isFetching: false, data: action.payload })
            });

        case Types.FETCH_LIST_TRANSLATE_SUCCESS:
            return Object.assign({}, state, {
                translateData: action.payload
            });

        case Types.BEFORE_FETCH_TRANSLATE_INFO:
            return Object.assign({}, state, {
                translateInfo: Object.assign({}, state.translateInfo, { isFetching: true })
            });
        case Types.SUCCESS_FETCH_TRANSLATE_INFO:
            return Object.assign({}, state, {
                translateInfo: Object.assign({}, state.translateInfo, { isFetching: false, data: action.payload })
            });

        default:
            return state;
    }
}
