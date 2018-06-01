import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { authSessionReducer } from "./authSessionReducer"
import { virtualMachineActionsReducer } from "./virtualMachine/virtualMachineActionsReducer";
import { virtualMachinesTableReducer } from "./virtualMachine/virtualMachinesTableReducer";
import { virtualMachineProvisionReducer } from './virtualMachine/virtualMachineProvisionReducer';
import { accountCreateReducer } from "./account/accountCreateReducer";
import { accountEditReducer } from "./account/accountEditReducer";
import { accountReducer } from "./account/accountReducer";
import { packagesReducer } from "./virtualMachine/packagesReducer";
import { networksReducer } from "./network/networkReducer";
import { networkCreateReducer } from "./network/networkCreateReducer";
import { networkActionsReducer } from "./network/networkActionsReducer";
import { imageReducer } from "./virtualMachine/imageReducer";
export const rootReducer = combineReducers({
    form: formReducer,
    authSession: authSessionReducer,
    virtualMachineActions: virtualMachineActionsReducer,
    virtualMachines: virtualMachinesTableReducer,
    virtualMachineProvision: virtualMachineProvisionReducer,
    accountCreate: accountCreateReducer,
    accountEdit: accountEditReducer,
    account: accountReducer,
    packages: packagesReducer,
    networks: networksReducer,
    networkCreate: networkCreateReducer,
    networkActions: networkActionsReducer,
    images: imageReducer
});