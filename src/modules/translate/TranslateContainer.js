import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { translate } from 'helpers/Translate';
import { actions } from 'redux-utils';
import TranslateComponent from './TranslateComponent';

class TranslateContainer extends Component {
    componentWillMount() {
        const { languageActions } = this.props;
        languageActions.getListLanguage();
        languageActions.getListTranslate();
    }

    render() {
        const { language, languageActions, translate } = this.props;
        return <TranslateComponent language={language} languageActions={languageActions} translate={translate} />;
    }
}

TranslateContainer.propTypes = {
    languageActions: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(TranslateContainer);
