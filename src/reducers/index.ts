import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { authSessionReducer } from "./authSessionReducer"
import { virtualMachinesActionsReducer } from "./virtualMachinesActionsReducer";
import { virtualMachinesTableReducer } from "./virtualMachinesTableReducer";
import { createVirtualMachineReducer } from './createVirtualMachineReducer';
import { accountReducer } from "./accountReducer";
import { packagesReducer } from "./packagesReducer";

export const rootReducer = combineReducers({
    form: formReducer,
    authSession: authSessionReducer,
    virtualMachinesActions: virtualMachinesActionsReducer,
    virtualMachines: virtualMachinesTableReducer,
    createVirtualMachine: createVirtualMachineReducer,
    account: accountReducer,
    packages: packagesReducer
});