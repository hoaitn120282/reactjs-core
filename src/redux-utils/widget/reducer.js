import immer from 'immer';
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
    return immer(state, draftState => {
        switch (action.type) {
            case SUCCESS_FETCH_WIDGET_ROUTE_LIST:
                draftState.routeData = action.payload;
                return;

            case SUCCESS_FETCH_WIDGET_FIELD_LIST:
                draftState.widgetField = fieldByWidget(state, action.payload);
                return;

            default:
                return;
        }
    });
}
