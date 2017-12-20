import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from 'redux-utils';
import { translate } from 'helpers/Translate';
import LanguageComponent from './LanguageComponent';

class LanguageContainer extends Component {
    componentWillMount() {
        const { languageActions } = this.props;
        languageActions.getListLanguage();
    }

    render() {
        const { language, languageActions, translate } = this.props;
        return <LanguageComponent language={language} languageActions={languageActions} translate={translate} />;
    }
}

LanguageContainer.propTypes = {
    auth: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer);
