import { auth, authActions } from './auth';
import { role, roleActions } from './role';
import { common, commonActions } from './common';
import { register, registerActions } from './register';
import { language, languageActions } from './language';
import { widget, widgetActions } from './widget';

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
