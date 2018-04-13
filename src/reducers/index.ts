import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { authSessionReducer } from "./authSessionReducer"
import { virtualMachineActionsReducer } from "./virtualMachineActionsReducer";
import { virtualMachinesTableReducer } from "./virtualMachinesTableReducer";
import { virtualMachineCreateReducer } from './virtualMachineCreateReducer';
import { accountCreateReducer } from "./accountCreateReducer";
import { accountEditReducer } from "./accountEditReducer";
import { accountLoadReducer } from "./accountLoadReducer";
import { packagesReducer } from "./packagesReducer";
import { sshKeysReducer } from './sshKeysReducer';
import { networksReducer } from "./networkReducer";
import { networkCreateReducer } from "./networkCreateReducer";
import { networkActionsReducer } from "./networkActionsReducer";

export const rootReducer = combineReducers({
    form: formReducer,
    authSession: authSessionReducer,
    virtualMachineActions: virtualMachineActionsReducer,
    virtualMachines: virtualMachinesTableReducer,
    virtualMachineCreate: virtualMachineCreateReducer,
    accountCreate: accountCreateReducer,
    accountEdit: accountEditReducer,
    accountLoad: accountLoadReducer,
    packages: packagesReducer,
    sshKeys: sshKeysReducer,
    networks: networksReducer,
    networkCreate: networkCreateReducer,
    networkActions: networkActionsReducer
});