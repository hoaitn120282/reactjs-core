import React from 'react';
import PropTypes from 'prop-types';

import RoleView from './../common/RoleView';

const AdminView = ({ children }) => {
    return <RoleView roleName="admin">{children}</RoleView>;
};

AdminView.propTypes = {
    children: PropTypes.any
};

export default AdminView;
