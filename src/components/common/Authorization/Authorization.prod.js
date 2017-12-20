import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
};

const Authorization = (allowedRoles = []) => {
    return WrappedComponent => {
        class WithAuthorization extends Component {
            render() {
                const { auth: { role } } = this.props;
                if (allowedRoles.includes(role)) {
                    return <WrappedComponent {...this.props} />;
                } else {
                    return <h1 className="text-danger">403 - ACCESS DENIED</h1>;
                }
            }
        }

        WithAuthorization.propTypes = {
            auth: PropTypes.object.isRequired
        };
        return connect(mapStateToProps)(WithAuthorization);
    };
};

export default Authorization;
