import { connect } from 'react-redux';
import { LocaleProvider } from 'antd';
import moment from 'moment';
import enUS from 'antd/lib/locale-provider/en_US';
import viVN from 'antd/lib/locale-provider/vi_VN';

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.
const mapStateToProps = state => {
    const { locale } = state.language;
    switch (locale) {
        case 'en':
        case 'en_US':
            moment.locale('en');
            return { locale: enUS };
        case 'vi':
        case 'vi_VN':
            moment.locale('vi');
            return { locale: viVN };
        default:
            moment.locale('en');
            return { locale: enUS };
    }
};

export default connect(mapStateToProps)(LocaleProvider);
