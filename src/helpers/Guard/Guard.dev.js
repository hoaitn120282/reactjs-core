import _ from 'lodash';

const allRoles = ['admin', 'developer', 'seller', 'agent'];

export const isAdmin = auth => {
    const { role, isFullPermission } = auth;

    return isFullPermission || role === 'admin';
};

export const isHasAnyRole = auth => {
    const { role, isFullPermission } = auth;
    return isFullPermission || allRoles.includes(role);
};

export const isDeveloper = auth => {
    const { role, isFullPermission } = auth;
    return isFullPermission || role === 'developer';
};

export const isSeller = auth => {
    const { role, isFullPermission } = auth;
    return isFullPermission || role === 'seller';
};

export const isAgent = auth => {
    const { role, isFullPermission } = auth;
    return isFullPermission || role === 'agent';
};

export const isHasRole = (auth, roles = []) => {
    const { role, isFullPermission } = auth;
    return isFullPermission || (!_.difference(roles, allRoles).length && roles.includes(role));
};

export const hasRole = (auth = {}) => {
    const { role, isFullPermission } = auth;
    return (roles = []) => {
        return isFullPermission || (allRoles.includes(role) && roles.includes(role));
    };
};
