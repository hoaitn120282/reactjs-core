import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';

import { actions } from 'redux-utils';
import { appRoutes } from 'routes';
import { Cube as Loading } from 'components/loading';

import DevTools from 'containers/DevTools';
import Request from 'helpers/Request';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true
        };
    }
    componentWillMount() {
        const { authActions, languageActions, commonActions } = this.props;
        const promsList = [];
        if (Request.token) {
            promsList.push(authActions.me());
        }
        promsList.concat([
            languageActions.getListLanguage(),
            languageActions.getLanguages(),
            commonActions.getConfig()
        ]);
        Promise.all(promsList)
            .then(() => {
                this.setState({ isFetching: false });
            })
            .catch(() => {
                this.setState({ isFetching: false });
            });
    }
    componentDidMount() {
        // window.fbAsyncInit = function() {
        //     window.FB.init({
        //         appId: '296879230789501',
        //         autoLogAppEvents: true,
        //         xfbml: true,
        //         version: 'v2.10'
        //     });
        // };
        // (function(d, s, id) {
        //     var js,
        //         fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) return;
        //     js = d.createElement(s);
        //     js.id = id;
        //     js.src = '//connect.facebook.net/vi_VN/sdk/debug.js';
        //     fjs.parentNode.insertBefore(js, fjs);
        // })(document, 'script', 'facebook-jssdk');
    }

    render() {
        const { language: { locale } } = this.props;
        const { isFetching } = this.state;

        const isDev = process.env.NODE_ENV === 'production' ? false : true;
        return (
            <Fragment>
                <Helmet htmlAttributes={{ lang: locale }} defaultTitle="CRM" titleTemplate="CRM - %s" />
                {!isFetching && <Fragment>{appRoutes}</Fragment>}
                {isFetching && (
                    <Fragment>
                        <div className="d-flex justify-content-center align-items-center">
                            <Loading loading={isFetching} />
                        </div>
                    </Fragment>
                )}

                {isDev && <DevTools />}
            </Fragment>
        );
    }
}

App.propTypes = {
    commonActions: PropTypes.object.isRequired,
    languageActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, language } = state;
    return {
        language,
        auth,
        loading: state.ajaxCallsInProgress > 0
    };
};

const mapDispatchToProps = dispatch => {
    return {
        commonActions: bindActionCreators(actions.commonActions, dispatch),
        authActions: bindActionCreators(actions.authActions, dispatch),
        languageActions: bindActionCreators(actions.languageActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
