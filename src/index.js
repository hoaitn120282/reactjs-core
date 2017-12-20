import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import vi from 'react-intl/locale-data/vi';
import zh from 'react-intl/locale-data/zh';
import 'moment/locale/zh-cn';
import 'moment/locale/vi';

import configureStore from './stores/configureStore';
import registerServiceWorker from './registerServiceWorker';

import 'font-awesome/css/font-awesome.css';
import './less/index.less';
import './shared/index.global.scss';

import { APP_DOM_CONTAINER } from 'constants/config';
import App from './App';
import ConnectedIntlProvider from './containers/ConnectedIntlProvider';
import ConnectedLocaleProvider from './containers/ConnectedLocaleProvider';

// Reactopt
// if (process.env.NODE_ENV !== 'production') {
// 	const { reactopt } = require('reactopt');
// 	reactopt(React);
// }

addLocaleData([...en, ...vi, ...zh]);

const history = createHistory();

const middleware = routerMiddleware(history);

const store = configureStore(middleware);
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ConnectedLocaleProvider>
                <ConnectedIntlProvider>
                    <App />
                </ConnectedIntlProvider>
            </ConnectedLocaleProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById(APP_DOM_CONTAINER)
);
registerServiceWorker();
