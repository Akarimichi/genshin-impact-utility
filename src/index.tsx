import React, { Fragment } from 'react';
import { render } from 'react-dom';
import Root from './ui/root';
import { configureStore, history } from './redux/store';
import './assets/styles/app.scss';

const store = configureStore();

document.addEventListener('DOMContentLoaded', () =>
    render(
        <>
            <Root store={store} history={history} />
        </>,
        document.getElementById('app')
    )
);
