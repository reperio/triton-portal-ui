import {initialState, StateVirtualMachineEdit} from "../../store/initialState";
import { virtualMachineActionTypes } from "../../actions/virtualMachineActions";

export function virtualMachineEditReducer(state = initialState.virtualMachineEdit, action: {type: string, payload: any}): StateVirtualMachineEdit {
    switch (action.type) {
        case virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_START: {
            return {
                isLoading: true
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_END: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_ERROR: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_NAVIGATE: {
            return {
                isLoading: true
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_NAVIGATE_END: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_NAVIGATE_ERROR: {
            return {
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}