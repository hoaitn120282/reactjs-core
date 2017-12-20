import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'helpers/Translate';

const Translate = ({ text, lang, language = {} }) => {
    return getTranslate(language, text, lang);
};

Translate.defaultProps = {
    text: '',
    lang: '',
    language: {}
};
Translate.propTypes = {
    text: PropTypes.string.isRequired,
    lang: PropTypes.string,
    language: PropTypes.object.isRequired
};
const mapStateToProps = state => {
    const { language } = state;
    return { language };
};
export default connect(mapStateToProps)(Translate);
