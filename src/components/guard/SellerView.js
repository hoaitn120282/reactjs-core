import React from 'react';
import PropTypes from 'prop-types';

import RoleView from './../common/RoleView';

const SellerView = ({ children }) => {
    return <RoleView roleName="seller">{children}</RoleView>;
};

SellerView.propTypes = {
    children: PropTypes.any
};

export default SellerView;
