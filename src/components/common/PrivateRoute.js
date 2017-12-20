import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import EmptyLayout from 'components/layout/Empty';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const { auth } = rest;
    return (
        <Route
            {...rest}
            render={props => {
                const { isAuthenticated } = auth;
                return isAuthenticated ? (
                    <Layout {...props}>
                        <Component {...props} />
                    </Layout>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                );
            }}
        />
    );
};

PrivateRoute.defaultProps = {
    layout: EmptyLayout
};

PrivateRoute.propTypes = {
    component: PropTypes.any,
    location: PropTypes.any,
    layout: PropTypes.any
};

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth
    };
};

export default connect(mapStateToProps)(PrivateRoute);
