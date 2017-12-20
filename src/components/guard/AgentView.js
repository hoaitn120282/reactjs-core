import React from 'react';
import PropTypes from 'prop-types';

import RoleView from './../common/RoleView';

const AgentView = ({ children }) => {
    return <RoleView roleName="agent">{children}</RoleView>;
};

AgentView.propTypes = {
    children: PropTypes.any
};

export default AgentView;
