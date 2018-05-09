import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { authSessionReducer } from "./authSessionReducer"
import { virtualMachineActionsReducer } from "./virtualMachine/virtualMachineActionsReducer";
import { virtualMachinesTableReducer } from "./virtualMachine/virtualMachinesTableReducer";
import { virtualMachineCreateReducer } from './virtualMachine/virtualMachineCreateReducer';
import { accountCreateReducer } from "./account/accountCreateReducer";
import { accountEditReducer } from "./account/accountEditReducer";
import { accountLoadReducer } from "./account/accountLoadReducer";
import { packagesReducer } from "./virtualMachine/packagesReducer";
import { sshKeysReducer } from './account/sshKeysReducer';
import { networksReducer } from "./network/networkReducer";
import { networkCreateReducer } from "./network/networkCreateReducer";
import { networkActionsReducer } from "./network/networkActionsReducer";
import { imageReducer } from "./virtualMachine/imageReducer";

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
    networkActions: networkActionsReducer,
    images: imageReducer
});