import {initialState, StateCreateVirtualMachine} from "../store/initialState";
import { virtualMachineActionTypes } from "../actions/virtualMachineActions";

export function createVirtualMachineReducer(state = initialState.virtualMachines, action: {type: string, payload: any}): StateCreateVirtualMachine {
    switch (action.type) {
        case virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_START: {
            return {
                isLoading: true,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_END: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        default: {
            return state;
        }
    }
}