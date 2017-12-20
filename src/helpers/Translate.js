import _ from 'lodash';

export const getTranslate = (language = {}, text, lang = '') => {
    const { data: languages, locale } = language;
    text = _.camelCase(text);
    const langData = languages[lang] || languages[locale] || {};
    return _.get(langData, text, _.capitalize(_.lowerCase(_.deburr(text))));
};

export const translate = (language = {}) => {
    return (text, lang = '') => {
        return getTranslate(language, text, lang);
    };
};
