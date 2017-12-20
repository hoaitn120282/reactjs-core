import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import LoadingDots from './LoadingDots';

const Header = ({ loading, auth, onLogout }) => {
    const { isAuthenticated } = auth;
    return isAuthenticated ? (
        <nav>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" exact activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" role="button" onClick={onLogout}>
                        Logout
                    </a>
                </li>
                {loading && <LoadingDots interval={100} dots={20} />}
            </ul>
        </nav>
    ) : null;
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default Header;
