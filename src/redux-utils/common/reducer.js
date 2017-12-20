import { FETCH_CONFIG_SUCCESS } from './constants';

const initState = {
    userRoleList: []
};

export default function(state = initState, action) {
    switch (action.type) {
        case FETCH_CONFIG_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
