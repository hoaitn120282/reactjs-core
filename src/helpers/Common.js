import { BASE_URL } from 'constants/config';
import url from 'url';
import _ from 'lodash';

export const generateImageUrl = (link = '') => {
    if (_.isString(link)) return url.resolve(BASE_URL, link);
    return '';
};
