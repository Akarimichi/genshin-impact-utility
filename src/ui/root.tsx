import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import Footer from './footer';
import Menu from './menu';
import Body from './body';
import MobileLandscapeRequired from './mobile-landscape-required';
import Popup from './components/popup';
import moment from 'moment';
import _i18n from '../translations/i18n';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';
import Login from './components/login';

type Props = {
    store: Store;
    history: History;
};

const App = () => {

    /* Check day popup disclaimer */

    let showPopupDisclaimer = false;
    if (localStorage.getItem('lastShownPopupDisclaimer')) {
        if (moment().format('YYYY-MM-DD') !== moment(localStorage.getItem('lastShownPopupDisclaimer'), 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD')) {
            showPopupDisclaimer = true;
            localStorage.setItem('lastShownPopupDisclaimer', moment().format('YYYY-MM-DD hh:mm:ss'));
        }
    } else {
        showPopupDisclaimer = true;
        localStorage.setItem('lastShownPopupDisclaimer', moment().format('YYYY-MM-DD hh:mm:ss'));
    }

    // Get locale
    const location = useLocation();
    const match: any = matchPath(location.pathname, {
        path: '/:locale',
        strict: false
    });

    const locale = match ? match.params.locale : 'en';

    return (
        <>
            <MobileLandscapeRequired locale={locale} />
            <div className="body-container">
                <Menu locale={locale}/>
                <Body />
                <Footer />
                <Login locale={locale} />
                <Popup
                    show={showPopupDisclaimer}
                    head={_i18n(locale, 'disclaimer_popup_title')}
                    body={_i18n(locale, 'disclaimer_popup_msg', true)}
                />
            </div>
        </>
    );
};


const Root = ({ store, history }: Props) => {

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>
    );
};

export default Root;
