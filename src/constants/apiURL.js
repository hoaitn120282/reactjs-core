export const authAPI = '/auth/login';
export const logoutAPI = '/auth/logout';
export const registerAPI = '/auth/register';
export const meAPI = '/me';

export const roleListAPI = '/roles/lists';
export const roleTestConditionAPI = '/roles/test-condition';
export const roleAPI = '/roles';
export const permissionAPI = ({ roleId }) => {
    return `/roles/${roleId}/permissions`;
};

export const widgetRouteAPI = '/widgets/routes';
export const fieldByWidgetAPI = ({ widget }) => {
    return `/widgets/${widget}/fields`;
};

export const uploadAPI = '/upload';

// Upload UnAuthorization file
export const uploadUnAuthAPI = '/upload/normal/media';

export const languageAPI = '/languages';

export const translateAPI = '/translates';

export const localeAPI = '/locales';
