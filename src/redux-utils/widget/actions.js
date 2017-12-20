import Request from 'helpers/Request';
import { widgetRouteAPI, fieldByWidgetAPI } from 'constants/apiURL';
import * as Types from './constants';

export function listWidgetRoute(params = {}) {
    return dispatch => {
        Request.makeGet(widgetRouteAPI).then(res => {
            dispatch({
                type: Types.SUCCESS_FETCH_WIDGET_ROUTE_LIST,
                payload: res.data
            });
        });
    };
}

export function listFieldByWidget(widget, params = {}) {
    return dispatch => {
        dispatch({
            type: Types.BEFORE_FETCH_WIDGET_FIELD_LIST,
            payload: {
                widget,
                data: {},
                isFetching: true
            }
        });
        Request.makeGet(fieldByWidgetAPI({ widget }), params)
            .then(res => {
                dispatch({
                    type: Types.SUCCESS_FETCH_WIDGET_FIELD_LIST,
                    payload: {
                        widget,
                        data: res.data,
                        isFetching: false
                    }
                });
            })
            .catch(() => {
                dispatch({
                    type: Types.ERROR_FETCH_WIDGET_FIELD_LIST,
                    payload: {
                        widget,
                        data: {},
                        isFetching: false
                    }
                });
            });
    };
}
