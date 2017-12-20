import { connect } from 'react-redux';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import viVN from 'antd/lib/locale-provider/vi_VN';

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.
const mapStateToProps = state => {
    const { locale } = state.language;
    switch (locale) {
        case 'en':
        case 'en_US':
            return { locale: enUS };
        case 'vi':
        case 'vi_VN':
            return { locale: viVN };
        case 'zh':
        case 'zh_CN':
            return { locale: zhCN };
        default:
            return { locale: enUS };
    }
};

export default connect(mapStateToProps)(LocaleProvider);
