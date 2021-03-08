import { createLogger } from 'redux-logger';
import {
    shallowEqual,
    useSelector as useReduxSelector,
    useDispatch as useReduxDispatch
} from 'react-redux';
import {
    Store,
    createStore,
    Dispatch,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware, connectRouter, RouterState } from 'connected-react-router';
import * as Menu from './states/Menu';

// ------------------- TYPES

// REDUX DEVTOOLS

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (
            obj: Record<string, any>
        ) => any;
    }
}

// STATE
export interface State {
    menu: Menu.State;
    router: RouterState;
}

// ACTION
export type Action = Menu.Action;

// ------------------- HISTORY

export const history = createHashHistory();

// ------------------- REDUCER

const createRootReducer = combineReducers<State>({
    menu: Menu.reducer,
    router: connectRouter(history)
});

// ------------------- STORE

// DEV STORE
const configureStoreDev = (): Store => {
    const enhancers = [];

    const middleware = [routerMiddleware(history)];

    // Redux logger

    const logger = createLogger({
        level: 'info',
        collapsed: true
    });

    middleware.push(logger);

    const actionCreators = {};

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            actionCreators
        })
        : compose;

    // Apply Middleware & Compose Enhancers
    enhancers.push(applyMiddleware(...middleware));
    const enhancer = composeEnhancers(...enhancers);

    return createStore(createRootReducer, enhancer);
};

// PROD STORE
const configureStoreProd = (): Store => {
    return createStore(createRootReducer);
};

// Use Dev / Prod store
const configureStore =
    process.env.NODE_ENV === 'production'
        ? configureStoreProd
        : configureStoreDev;

// METHODS

export function useSelector<T>(selector: (state: State) => T): T {
    return useReduxSelector(selector, shallowEqual);
}

export function useDispatch(): Dispatch<Action> {
    return useReduxDispatch<Dispatch<Action>>();
}

export { configureStore };
