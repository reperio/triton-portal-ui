import {initialState, StateVirtualMachines} from "../../store/initialState";
import { virtualMachineActionTypes } from "../../actions/virtualMachineActions";

export function virtualMachinesTableReducer(state = initialState.virtualMachines, action: {type: string, payload: any}): StateVirtualMachines {
    switch (action.type) {
        case virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_START: {
            return {
                vms: [],
                isLoading: true
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_END: {
            return {
                vms: action.payload.vms,
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_ERROR: {
            return {
                vms: [],
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINES_GET_BY_OWNER_START: {
            return {
                vms: [],
                isLoading: true
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINES_GET_BY_OWNER_END: {
            return {
                vms: action.payload.vms,
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINES_GET_BY_OWNER_ERROR: {
            return {
                vms: [],
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}