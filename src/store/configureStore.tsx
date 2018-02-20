import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';

export const history = createHistory();

function configureStore(initialState?:object) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middleware = [
        thunk,
        reactRouterMiddleware
    ];

    return createStore(rootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(), compose(
        applyMiddleware(...middleware)
    ), );
}

export default configureStore;
