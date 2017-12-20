import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Cube } from 'components/loading';

import { Notification } from 'helpers';
import { actions } from 'redux-utils';
import { translate } from 'helpers/Translate';
import RoleViewComponent from './RoleViewComponent';
class RoleViewContainer extends Component {
    componentWillMount() {
        const { widgetActions, match: { params } } = this.props;
        this._getPermission(params.id);
        widgetActions.listWidgetRoute();
    }

    componentWillReceiveProps(nextProps) {
        const { match: { params: currentParams } } = this.props;
        const { match: { params } } = nextProps;
        if (currentParams.id !== params.id) {
            this._getPermission(params.id);
        }
    }

    _getPermission = id => {
        const { roleActions } = this.props;
        roleActions.getPermissionByRole(id);
        roleActions.getRoleById(id);
    };

    openNotification = () => {
        const { translate } = this.props;
        Notification.success('updatePermissionSuccessfully', translate, {
            duration: 3
        });
    };

    openNotificationError = error => {
        Notification.error(error.data, translate, {
            duration: 3
        });
    };

    updatePermissionAction = data => {
        const { roleActions, match: { params } } = this.props;
        roleActions
            .updatePermissionByRole(params.id, data)
            .then(() => this.openNotification())
            .catch(error => this.openNotificationError(error));
    };

    render() {
        const {
            widget: { routeData },
            role: { rolePermission, roleInfo, hasRequestUpdatePermission },
            match: { params }
        } = this.props;
        const permission = rolePermission[params.id] || {};
        const { fetchData, isFetching } = permission;

        return (
            <div>
                <Cube loading={isFetching} />
                {fetchData &&
                    fetchData.data && (
                        <RoleViewComponent
                            roleInfo={roleInfo}
                            permission={permission}
                            updatePermissionAction={this.updatePermissionAction}
                            routeData={routeData}
                            isLoading={hasRequestUpdatePermission}
                        />
                    )}
            </div>
        );
    }
}

RoleViewContainer.propTypes = {
    match: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
    widgetActions: PropTypes.object.isRequired,
    role: PropTypes.object.isRequired,
    roleActions: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { role, widget, language } = state;
    return {
        role,
        widget,
        translate: translate(language)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        roleActions: bindActionCreators(actions.roleActions, dispatch),
        widgetActions: bindActionCreators(actions.widgetActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleViewContainer);
