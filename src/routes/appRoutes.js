import React from 'react';
import { Switch, Redirect, HashRouter as Router } from 'react-router-dom';

import EmptyLayout from 'components/layout/Empty';
import MainLayout from 'components/layout/Main';

import RouteLayout from 'components/common/RouteLayout';
import PrivateRoute from 'components/common/PrivateRoute';
import Authorization from 'components/common/Authorization';

// pages
import HomePage from 'components/home/HomePage';
import Page404 from 'components/pages/404';
import Page403 from 'components/pages/403';

import LoginContainer from 'modules/login/LoginContainer';
import RegisterContainer from 'modules/register/RegisterContainer';
import DashboardContainer from 'modules/dashboard/containers/DashBoardContainer';

// Language
import LanguagePageContainer from 'modules/language/LanguageContainer';
import TranslatePageContainer from 'modules/translate/TranslateContainer';

import RoleContainer from 'modules/role/RoleContainer';
import RoleViewContainer from 'modules/role/pages/RoleViewContainer';

const AdminGuard = Authorization(['admin']);

export default (
    <Router basename="/" hasType="hashbang">
        <Switch>
            <RouteLayout exact path="/" component={HomePage} />
            <RouteLayout layout={EmptyLayout} path="/login" component={LoginContainer} />
            <RouteLayout layout={EmptyLayout} path="/register" component={RegisterContainer} />
            <PrivateRoute layout={MainLayout} path="/language" component={AdminGuard(LanguagePageContainer)} />
            <PrivateRoute layout={MainLayout} path="/translate" component={AdminGuard(TranslatePageContainer)} />
            <PrivateRoute layout={MainLayout} path="/dashboard" component={DashboardContainer} />

            <PrivateRoute layout={MainLayout} exact path="/role" component={AdminGuard(RoleContainer)} />
            <PrivateRoute layout={MainLayout} path="/role/:id" component={AdminGuard(RoleViewContainer)} />

            <RouteLayout layout={EmptyLayout} path="/404" component={Page404} />
            <PrivateRoute layout={EmptyLayout} path="/403" component={Page403} />

            <Redirect from="*" to="/404" />
        </Switch>
    </Router>
);
