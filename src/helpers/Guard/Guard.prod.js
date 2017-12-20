import _ from 'lodash';

const allRoles = ['admin', 'developer', 'seller', 'agent'];

export const isAdmin = auth => {
    const { role } = auth;
    return role === 'admin';
};

export const isHasAnyRole = auth => {
    const { role } = auth;
    return allRoles.includes(role);
};

export const isDeveloper = auth => {
    const { role } = auth;
    return role === 'developer';
};

export const isSeller = auth => {
    const { role } = auth;
    return role === 'seller';
};

export const isAgent = auth => {
    const { role } = auth;
    return role === 'agent';
};

export const isHasRole = (auth, roles = []) => {
    const { role } = auth;
    return !_.difference(roles, allRoles).length && roles.includes(role);
};

export const hasRole = (auth = {}) => {
    const { role } = auth;
    return (roles = []) => {
        return allRoles.includes(role) && roles.includes(role);
    };
};
