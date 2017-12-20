import React from 'react';
import { Switch, Redirect, HashRouter as Router } from 'react-router-dom';

import EmptyLayout from 'components/layout/Empty';

import RouteLayout from 'components/common/RouteLayout';

// pages
import HomePage from 'components/home/HomePage';

import LoginContainer from 'modules/login/LoginContainer';
import RegisterContainer from 'modules/register/RegisterContainer';

export default (
    <Router basename="/" hasType="hashbang">
        <Switch>
            <RouteLayout exact path="/" component={HomePage} />
            <RouteLayout layout={EmptyLayout} path="/login" component={LoginContainer} />
            <RouteLayout layout={EmptyLayout} path="/register" component={RegisterContainer} />

            <Redirect from="*" to="/login" />
        </Switch>
    </Router>
);
