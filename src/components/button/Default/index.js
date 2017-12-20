import React from 'react';
import PropTypes from 'prop-types';
// import _ from 'lodash';

import styles from './style.scss';

const DefaultButton = props => {
    const { children, className } = props;
    return (
        <button {...props} className={`${styles.button} ${className}`}>
            {children}
        </button>
    );
};

DefaultButton.defaultProps = {
    className: ''
};

DefaultButton.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default DefaultButton;
