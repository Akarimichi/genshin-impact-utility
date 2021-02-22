import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import Footer from './footer';
import Header from './header';
import Body from './body';

type Props = {
    store: Store;
    history: History;
};

const Root = ({ store, history }: Props) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Header />
            <Body />
            <Footer/>
        </ConnectedRouter>
    </Provider>
);

export default Root;
