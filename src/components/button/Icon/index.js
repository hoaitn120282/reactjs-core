import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './style.scss';

class IconButton extends Component {
    render() {
        const { children, className } = this.props;
        const props = _.omit(this.props, ['className', 'children']);

        return (
            <button className={`${styles.button} ${className}`} {...props}>
                {children}
            </button>
        );
    }
}

IconButton.defaultProps = {
    className: ''
};

IconButton.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default IconButton;
