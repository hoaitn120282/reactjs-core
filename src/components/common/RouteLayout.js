import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import EmptyLayout from 'components/layout/Empty';

const RouteLayout = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        )}
    />
);

RouteLayout.defaultProps = {
    layout: EmptyLayout
};

RouteLayout.propTypes = {
    component: PropTypes.any,
    layout: PropTypes.any
};

export default RouteLayout;
