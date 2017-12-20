import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

class RoleViewComponent extends Component {
    _hasInArray(source, dest) {
        return _.difference(dest, source).length === 0;
    }

    _checkFields = (source = [], dest) => {
        if (!source.length) {
            return false;
        } else {
            if (source.includes('*')) return true;
            if (dest) {
                if (_.isString(dest)) {
                    dest = [dest];
                } else if (!Array.isArray(dest)) {
                    return false;
                }
                if (!this._hasInArray(source, dest)) {
                    return false;
                }
            } else {
                return true;
            }
        }
    };

    _checkRender = () => {
        let { routes, action = '', fields } = this.props;
        const {
            isAdmin,
            roleName,
            visible,
            invisible,
            widget,
            owner,
            auth: { userInfo = {}, isFullPermission, role, permissions, accountRoutes }
        } = this.props;
        action = _.trim(action);

        // For testing
        if (isFullPermission) {
            return true;
        }
        // End for testing

        if (isAdmin === true) {
            if (role === 'admin') {
                return true;
            }
        }

        if (visible === true) {
            return true;
        } else if (visible === false) {
            return false;
        }

        if (invisible) return false;

        if (owner !== undefined) {
            if (Array.isArray(owner)) {
                if (!owner.includes(userInfo.id)) {
                    return false;
                }
            } else {
                if (userInfo.id !== owner) {
                    return false;
                }
            }
        }

        if (roleName) {
            if (Array.isArray(roleName)) {
                if (!roleName.includes(role)) return false;
            } else {
                const roleNames = _.map(_.split(_.toString(roleName), ','), _.trim);
                if (!roleNames.includes(role)) return false;
            }
        }

        if (Array.isArray(fields)) {
            fields = _.map(fields, _.trim);
        } else {
            fields = _.map(_.split(_.toString(fields), ','), _.trim);
        }

        if (widget) {
            if (permissions.hasOwnProperty(widget)) {
                const widgetData = permissions[widget] || {};
                const { viewableFields = [], editableFields = [] } = widgetData;
                if (action) {
                    switch (action) {
                        case 'create':
                        case 'new':
                            if (!widgetData.addable) return false;
                            break;
                        case 'read':
                        case 'view':
                            if (!this._checkFields(viewableFields, fields)) return false;
                            break;
                        case 'update':
                        case 'edit':
                            if (!this._checkFields(editableFields, fields)) return false;
                            break;
                        default:
                            break;
                    }
                }

                if (routes) {
                    if (_.isString(routes)) {
                        routes = [routes];
                    } else if (!Array.isArray(routes)) {
                        return false;
                    }
                    if (!this._hasInArray(accountRoutes, routes)) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    render() {
        const { children } = this.props;

        return this._checkRender() ? children : null;
    }
}

RoleViewComponent.defaultProps = {
    widget: '',
    invisible: false
};

RoleViewComponent.propTypes = {
    children: PropTypes.any,
    isAdmin: PropTypes.bool,
    invisible: PropTypes.bool,
    visible: PropTypes.bool,
    widget: PropTypes.string,
    routes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    fields: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    actions: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    action: PropTypes.oneOf(['create', 'new', 'update', 'edit', 'delete', 'remove', 'read', 'view']),
    auth: PropTypes.object.isRequired,
    owner: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.string]),
    roleName: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth
    };
};

export default connect(mapStateToProps)(RoleViewComponent);
