import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from 'redux-utils';
import { translate } from 'helpers/Translate';
import TranslateEditComponent from './TranslateEditComponent';

class TranslateEditContainer extends Component {
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
        languageActions.getTranslate(id);
    };

    render() {
        const { language, languageActions, translate } = this.props;
        return <TranslateEditComponent language={language} languageActions={languageActions} translate={translate} />;
    }
}

TranslateEditContainer.propTypes = {
    match: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    languageActions: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { auth, language } = state;
    return { auth, language, translate: translate(language) };
};

const mapDispatchToProps = dispatch => {
    return {
        languageActions: bindActionCreators(actions.languageActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TranslateEditContainer);
