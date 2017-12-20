import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import LanguageEditPage from './pages/edit/LanguageEditContainer';

export default (
    <Fragment>
        <Route path="/language/:id/edit" component={LanguageEditPage} />
    </Fragment>
);
