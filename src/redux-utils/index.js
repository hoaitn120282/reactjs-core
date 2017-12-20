import auth from './auth/reducer';
import * as authActions from './auth/actions';

import role from './role/reducer';
import * as roleActions from './role/actions';

import common from './common/reducer';
import * as commonActions from './common/actions';

import register from './register/reducer';
import * as registerActions from './register/actions';

import language from './language/reducer';
import * as languageActions from './language/actions';

import widget from './widget/reducer';
import * as widgetActions from './widget/actions';

export const reducers = {
    auth,
    register,
    role,
    widget,
    common,
    language
};

export const actions = {
    authActions,
    registerActions,
    roleActions,
    widgetActions,
    commonActions,
    languageActions
};
