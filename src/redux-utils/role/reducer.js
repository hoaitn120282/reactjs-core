import _ from 'lodash';
import * as Types from './constants';

const initState = {
    hasRequestRoleData: false,
    roleData: { data: [] },
    rolePermission: {},
    roleInfo: {},
    hasRequestUpdatePermission: false
};

const roleByPermission = (state, data) => {
    return Object.assign({}, state.rolePermission, {
        [data.roleId]: {
            fetchData: data.data,
            isFetching: data.isFetching
        }
    });
};

const removeRole = (state, data) => {
    const { roleData } = state;
    _.remove(roleData.data, { id: data.id });
    return roleData;
};

const pushRoleToList = (state, data) => {
    const { roleData } = state;
    roleData.data = [data, ...roleData.data];
    return roleData;
};

export default function role(state = initState, action = {}) {
    switch (action.type) {
        case Types.SUCCESS_FETCH_LIST_ROLE:
            return Object.assign({}, state, {
                roleData: action.payload,
                hasRequestRoleData: false
            });
        case Types.BEFORE_FETCH_LIST_ROLE:
            return Object.assign({}, state, {
                hasRequestRoleData: true
            });
        case Types.ERROR_FETCH_LIST_ROLE:
            return Object.assign({}, state, {
                roleData: {},
                hasRequestRoleData: false
            });

        case Types.BEFORE_FETCH_LIST_PERMISSION:
        case Types.ERROR_FETCH_LIST_PERMISSION:
        case Types.SUCCESS_FETCH_LIST_PERMISSION:
            return Object.assign({}, state, {
                rolePermission: roleByPermission(state, action.payload)
            });

        case Types.SUCCESS_REQUEST_REMOVE_ROLE:
            return Object.assign({}, state, {
                roleData: removeRole(state, action.payload)
            });

        case Types.PUSH_ROLE_TO_LIST:
            return Object.assign({}, state, {
                roleData: pushRoleToList(state, action.payload)
            });

        case Types.SUCCESS_REQUEST_ROLE_INFO:
            return Object.assign({}, state, {
                roleInfo: action.payload
            });

        case Types.BEFORE_REQUEST_UPDATE_PERMISSION:
        case Types.SUCCESS_REQUEST_UPDATE_PERMISSION:
        case Types.ERROR_REQUEST_UPDATE_PERMISSION:
        case Types.FAIL_REQUEST_UPDATE_PERMISSION:
            return Object.assign({}, state, {
                hasRequestUpdatePermission: action.payload.isFetching
            });

        default:
            return state;
    }
}
