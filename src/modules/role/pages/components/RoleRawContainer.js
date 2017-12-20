import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import RoleRawComponent from './RoleRawComponent';
import { actions } from 'redux-utils';

class RoleRawContainer extends Component {
    componentWillMount() {
        const { widgetActions, role } = this.props;
        widgetActions.listFieldByWidget(role.widget);
    }

    render() {
        const { onChangeField, routeData, role, widget: { widgetField } } = this.props;
        const field = widgetField[role.widget];
        const actions = _.filter(routeData.data, { widget: role.widget });
        return field && !field.isFetching ? (
            <RoleRawComponent updateField={onChangeField} fieldData={field.data} role={role} actions={actions} />
        ) : (
            <tr />
        );
    }
}

RoleRawContainer.propTypes = {
    routeData: PropTypes.object.isRequired,
    role: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
    widgetActions: PropTypes.object.isRequired,
    onChangeField: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { widget } = state;
    return {
        widget
    };
};

const mapDispatchToProps = dispatch => {
    return {
        widgetActions: bindActionCreators(actions.widgetActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleRawContainer);
