import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
// import { Col } from 'reactstrap';
import TranslateEditPage from './pages/edit/TranslateEditContainer';

export default (
    <Fragment>
        <Route path="/translate/:id/edit" component={TranslateEditPage} />
    </Fragment>
);
