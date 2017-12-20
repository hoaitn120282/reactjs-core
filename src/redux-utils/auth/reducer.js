import * as Types from './constants';

const initState = {
    isAuthenticated: false,
    token: '',
    userInfo: {},
    hasRequestLogin: false,
    hasRequestMe: true,
    errorLogin: {},
    permissions: {},
    accountRoutes: [],
    role: '',
    isFullPermission: false,
    successLogout: false
};

export default function(state = initState, action) {
    switch (action.type) {
        case Types.BEFORE_REQUEST_LOGIN:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestLogin: true,
                token: '',
                userInfo: {},
                errorLogin: {},
                permissions: {},
                accountRoutes: [],
                role: ''
            };
        case Types.ERROR_REQUEST_LOGIN:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestLogin: false,
                token: '',
                userInfo: {},
                errorLogin: action.payLoad,
                permissions: {},
                accountRoutes: [],
                role: ''
            };
        case Types.SUCCESS_REQUEST_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                hasRequestLogin: false,
                userInfo: action.payload.user,
                token: action.payload.accessToken,
                errorLogin: {},
                permissions: action.payload.user.accountPermissions || {},
                accountRoutes: action.payload.user.accountRoutes || [],
                role: action.payload.user.roleName || ''
            };

        case Types.RESET_LOGOUT_REQUEST:
        case Types.BEFORE_REQUEST_LOGOUT:
            return { ...state, successLogout: false };
        case Types.ERROR_REQUEST_LOGOUT:
            return { ...state };
        case Types.SUCCESS_REQUEST_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                userInfo: {},
                token: '',
                permissions: {},
                accountRoutes: [],
                role: '',
                successLogout: true
            };

        case Types.BEFORE_REQUEST_ME:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestMe: true,
                token: '',
                userInfo: {},
                permissions: {},
                accountRoutes: [],
                role: ''
            };
        case Types.ERROR_REQUEST_ME:
            return {
                ...state,
                isAuthenticated: false,
                hasRequestMe: false,
                token: '',
                userInfo: {},
                permissions: {},
                accountRoutes: [],
                role: ''
            };
        case Types.SUCCESS_REQUEST_ME:
            return {
                ...state,
                isAuthenticated: true,
                hasRequestMe: false,
                userInfo: action.payload.user,
                token: action.payload.accessToken,
                permissions: action.payload.user.accountPermissions || {},
                accountRoutes: action.payload.user.accountRoutes || [],
                role: action.payload.user.roleName || ''
            };

        case Types.TOGGLE_FULL_PERMISSION:
            return {
                ...state,
                isFullPermission: !state.isFullPermission
            };

        default:
            return state;
    }
}
