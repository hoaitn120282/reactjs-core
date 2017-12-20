import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Footer extends Component {
    render() {
        const { auth: { isAuthenticated } } = this.props;
        return (
            isAuthenticated && (
                <footer className="footer">
                    <div className="container">Footer</div>
                </footer>
            )
        );
    }
}

Footer.propTypes = {
    auth: PropTypes.object.isRequired
};

export default Footer;
