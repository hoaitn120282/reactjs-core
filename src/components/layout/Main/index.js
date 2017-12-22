import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'redux-utils';
// import routes from 'components/routes';

import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';

import styles from './style.scss';

class MainLayout extends Component {
    constructor() {
        super();

        this.state = {
            navMini: false
        };
    }

    componentWillMount() {}

    toggleNav = e => {
        e.preventDefault();
        this.setState({ navMini: !this.state.navMini });
    };
    hideNav = e => {
        e.preventDefault();
        this.setState({ navMini: false });
    };

    onLogout = () => {
        const { authActions } = this.props;
        authActions.logout();
    };

    render() {
        const navMini = this.state.navMini;
        const { children, auth, authActions, languageActions, language } = this.props;
        return (
            <div className="app-wrapper">
                <Sidebar mini={navMini} />
                <div className={`content-container ${navMini ? 'full' : ''}`}>
                    <div
                        className="menu-dropshadow"
                        style={{ display: navMini ? 'block' : 'none' }}
                        onClick={this.hideNav}
                    />
                    <Header
                        auth={auth}
                        onLogout={this.onLogout}
                        toggleNav={this.toggleNav}
                        languageActions={languageActions}
                        language={language}
                        toggleFullPermission={authActions.toggleFullPermission}
                    />
                    <div className={styles.main}>{children}</div>
                </div>
            </div>
        );
    }
}

MainLayout.propTypes = {
    children: PropTypes.any.isRequired,
    auth: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    languageActions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, language } = state;
    return {
        auth,
        language,
        loading: state.ajaxCallsInProgress > 0
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        languageActions: bindActionCreators(actions.languageActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
