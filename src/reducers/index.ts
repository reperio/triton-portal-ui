import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { authSessionReducer } from "./authSessionReducer"
import { virtualMachinesActionsReducer } from "./virtualMachinesActionsReducer";
import { virtualMachinesTableReducer } from "./virtualMachinesTableReducer";
import { createVirtualMachineReducer } from './createVirtualMachineReducer';
import { accountCreateReducer } from "./accountCreateReducer";
import { accountEditReducer } from "./accountEditReducer";
import { accountLoadReducer } from "./accountLoadReducer";
import { packagesReducer } from "./packagesReducer";
import { sshKeysReducer } from './sshKeysReducer';
import { networksReducer } from "./networkReducer";

export const rootReducer = combineReducers({
    form: formReducer,
    authSession: authSessionReducer,
    virtualMachinesActions: virtualMachinesActionsReducer,
    virtualMachines: virtualMachinesTableReducer,
    createVirtualMachine: createVirtualMachineReducer,
    accountCreate: accountCreateReducer,
    accountEdit: accountEditReducer,
    accountLoad: accountLoadReducer,
    packages: packagesReducer,
    sshKeys: sshKeysReducer,
    networks: networksReducer
});