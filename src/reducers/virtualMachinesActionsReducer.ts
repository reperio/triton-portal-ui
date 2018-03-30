import {initialState, StateVirtualMachinesActions} from "../store/initialState";
import { virtualMachineActionTypes } from "../actions/virtualMachineActions";

export function virtualMachinesActionsReducer(state = initialState.virtualMachines, action: {type: string, payload: any}): StateVirtualMachinesActions {
    switch (action.type) {
        case virtualMachineActionTypes.VIRTUAL_MACHINE_START_START: {
            return {
                isLoading: true,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_START_END: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_START_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_STOP_START: {
            return {
                isLoading: true,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_STOP_END: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_STOP_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_START_START: {
            return {
                isLoading: true,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_REBOOT_END: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_REBOOT_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_DELETE_START: {
            return {
                isLoading: true,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_DELETE_END: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_DELETE_ERROR: {
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