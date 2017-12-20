import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from 'redux-utils';
import LanguageEditComponent from './LanguageEditComponent';

class LanguageEditContainer extends Component {
    componentWillMount() {
        const { match: { params } } = this.props;
        this.fetchEdit(params.id);
    }

    componentWillReceiveProps(nextProps) {
        const { match: { params } } = this.props;
        const { match: { params: newParams } } = nextProps;
        if (newParams.id !== params.id) {
            this.fetchEdit(newParams.id);
        }
    }

    fetchEdit = id => {
        const { languageActions } = this.props;
        languageActions.getLanguage(id);
    };

    render() {
        const { language: { languageInfo } } = this.props;
        return <LanguageEditComponent languageInfo={languageInfo} />;
    }
}

LanguageEditContainer.propTypes = {
    match: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    languageActions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, language } = state;
    return { auth, language };
};

const mapDispatchToProps = dispatch => {
    return {
        languageActions: bindActionCreators(actions.languageActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageEditContainer);
