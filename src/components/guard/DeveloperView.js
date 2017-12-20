import React from 'react';
import PropTypes from 'prop-types';

import RoleView from './../common/RoleView';

const DeveloperView = ({ children }) => {
    return <RoleView roleName="developer">{children}</RoleView>;
};

DeveloperView.propTypes = {
    children: PropTypes.any
};

export default DeveloperView;
