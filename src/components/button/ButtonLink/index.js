import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonLinkComponent = ({ to, color, children, ...rest }) => {
    return (
        <Link to={to} className={`btn btn-${color}`} {...rest}>
            {children}
        </Link>
    );
};

ButtonLinkComponent.defaultProps = {
    color: 'secondary'
};

ButtonLinkComponent.propTypes = {
    children: PropTypes.any.isRequired,
    color: PropTypes.string,
    to: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default ButtonLinkComponent;
