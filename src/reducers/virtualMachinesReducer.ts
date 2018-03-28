import {initialState, StateVirtualMachines} from "../store/initialState";
import { virtualMachineActionTypes } from "../actions/virtualMachineActions";

export function virtualMachinesReducer(state = initialState.virtualMachines, action: {type: string, payload: any}): StateVirtualMachines {
    switch (action.type) {
        case virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_START: {
            return {
                vms: [],
                isLoading: true,
                errorMessages: []
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_END: {
            return {
                vms: action.payload.vms,
                isLoading: false,
                errorMessages: []
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_ERROR: {
            return {
                vms: [],
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        default: {
            return state;
        }
    }
}