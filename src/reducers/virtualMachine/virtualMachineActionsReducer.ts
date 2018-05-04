import {initialState, StateVirtualMachineActions} from "../../store/initialState";
import { virtualMachineActionTypes } from "../../actions/virtualMachineActions";

export function virtualMachineActionsReducer(state = initialState.virtualMachineActions, action: {type: string, payload: any}): StateVirtualMachineActions {
    switch (action.type) {
        case virtualMachineActionTypes.VIRTUAL_MACHINE_START_START: {
            return {
                isLoading: true
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_START_END: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_START_ERROR: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_STOP_START: {
            return {
                isLoading: true
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_STOP_END: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_STOP_ERROR: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_START_START: {
            return {
                isLoading: true
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_REBOOT_END: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_REBOOT_ERROR: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_DELETE_START: {
            return {
                isLoading: true
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_DELETE_END: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_DELETE_ERROR: {
            return {
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}