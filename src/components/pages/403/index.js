import React from 'react';
import { Link } from 'react-router-dom';

import { display404 } from './style.scss';

export default () => (
    <div className="view">
        <div className="view-content view-pages view-error d-flex justify-content-center align-items-center flex-column">
            <h1 className={display404}>
                4<span />3
            </h1>
            <h4>ACCESS DENIED</h4>
            <p className="text-muted">
                The page you're looking doesn't exist. Go to <Link to="/">homepage.</Link>
            </p>
        </div>
    </div>
);
