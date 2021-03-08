import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import Footer from './footer';
import Menu from './menu';
import Body from './body';
import MobileLandscapeRequired from './mobile-landscape-required';

type Props = {
    store: Store;
    history: History;
};

const Root = ({ store, history }: Props) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MobileLandscapeRequired/>
            <div className="body-container">
                <Menu />
                <Body />
                <Footer/>
            </div>
        </ConnectedRouter>
    </Provider>
);

export default Root;
