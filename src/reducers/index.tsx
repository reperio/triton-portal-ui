import { combineReducers } from 'redux';
import test from './testReducer';
import notes from './noteReducer';
import { routerReducer } from 'react-router-redux';

/*
    note - the name of the reducer here (test, or note) is what will be seen on the state. 
    What is on the initial state object is mapped in each individual reducer
*/
const rootReducer = combineReducers({
    test,
    notes,
    routing: routerReducer
});

export default rootReducer;
