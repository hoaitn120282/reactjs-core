import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'redux-utils';
import { notification } from 'antd';
import { translate } from 'helpers/Translate';

import RegisterComponent from './RegisterComponent';
import { DEFAULT_REDIRECT } from 'constants/config';

class RegisterContainer extends Component {
    componentDidMount() {
        this.checkRedirect(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.checkRedirect(nextProps);
    }

    checkRedirect = nextProps => {
        const { history, auth: { isAuthenticated } } = nextProps;

        if (isAuthenticated) {
            history.push(DEFAULT_REDIRECT);
        }
    };

    openNotification = (type, description) => {
        const { translate } = this.props;
        notification[type]({
            message: translate('notification'),
            duration: 3,
            description: translate(description)
        });
    };
    onSubmit = values => {
        const { registerActions } = this.props;
        registerActions
            .register(values)
            .then(res => {
                this.openNotification(
                    'success',
                    'Your registration form has been sent to the RKRG Management. Please wait until you are approved to access our CRM.'
                );
                const { history } = this.props;
                history.push('/login');
            })
            .catch(err => {
                this.openNotification(
                    'error',
                    err.data
                        ? err.data.message
                        : 'Your registration form has not been sent successfully. Please try again.'
                );
            });
    };
    render() {
        const { commonActions, translate } = this.props;
        const { register: { isFetching } } = this.props;
        return (
            <div>
                <Helmet>
                    <title>Register</title>
                </Helmet>
                <RegisterComponent
                    onSubmit={this.onSubmit}
                    commonActions={commonActions}
                    isFetching={isFetching}
                    translate={translate}
                />
            </div>
        );
    }
}

RegisterContainer.propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    register: PropTypes.object.isRequired,
    registerActions: PropTypes.object.isRequired,
    commonActions: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { auth, register, language } = state;
    return {
        auth,
        register,
        translate: translate(language)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        registerActions: bindActionCreators(actions.registerActions, dispatch),
        commonActions: bindActionCreators(actions.commonActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
