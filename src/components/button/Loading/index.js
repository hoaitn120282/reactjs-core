import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

class DefaultButton extends Component {
    render() {
        const { children } = this.props;
        return (
            <button className={styles.button} {...this.props}>
                {children}
            </button>
        );
    }
}

DefaultButton.propTypes = {
    children: PropTypes.any.isRequired
};

export default DefaultButton;
