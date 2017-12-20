import { SUCCESS_FETCH_WIDGET_ROUTE_LIST, SUCCESS_FETCH_WIDGET_FIELD_LIST } from './constants';

const initState = {
    routeData: {},
    widgetField: {}
};

const fieldByWidget = (state, data) => {
    return Object.assign({}, state.widgetField, {
        [data.widget]: {
            data: data.data || {},
            isFetching: data.isFetching || false
        }
    });
};

export default function widget(state = initState, action) {
    switch (action.type) {
        case SUCCESS_FETCH_WIDGET_ROUTE_LIST:
            return Object.assign({}, state, {
                routeData: action.payload
            });

        case SUCCESS_FETCH_WIDGET_FIELD_LIST:
            return Object.assign({}, state, {
                widgetField: fieldByWidget(state, action.payload)
            });

        default:
            return state;
    }
}
