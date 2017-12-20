import _ from 'lodash';
import { notification } from 'antd';

class Notification {
    static success(description = '', translate = () => null, option = {}) {
        notification.success({
            message: translate('notification'),
            description: translate(description),
            ...option
        });
    }

    static error(data, translate = () => null, option = {}) {
        let { defaultDescription: message = 'somethingWentWrong' } = option;
        option = _.omit(option, ['defaultDescription']);
        if (_.isString(data)) {
            message = data;
        } else if (_.isObjectLike(data)) {
            message = data.message || '';
        }
        notification.error({
            message: translate('notification'),
            description: translate(message),
            ...option
        });
    }

    static info(message = '', translate = () => null, option = {}) {
        notification.info({
            message: translate('notification'),
            description: translate(message),
            ...option
        });
    }
    static warning(message = '', translate = () => null, option = {}) {
        notification.warning({
            message: translate('notification'),
            description: translate(message),
            ...option
        });
    }

    static warn(config = {}) {
        notification.warn(config);
    }

    static destroy() {
        notification.destroy();
    }
}

export default Notification;
