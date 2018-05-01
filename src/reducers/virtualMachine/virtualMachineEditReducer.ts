import {initialState, StateVirtualMachineEdit} from "../../store/initialState";
import { virtualMachineEditActionTypes } from "../../actions/virtualMachineEditActions";

export function virtualMachineEditReducer(state = initialState.virtualMachineEdit, action: {type: string, payload: any}): StateVirtualMachineEdit {
    switch (action.type) {
        case virtualMachineEditActionTypes.VIRTUAL_MACHINE_EDIT_START: {
            return {
                isLoading: true,
                errorMessages: [],
                selectedVm: action.payload.selectedVm
            };
        }
        case virtualMachineEditActionTypes.VIRTUAL_MACHINE_EDIT_END: {
            return {
                isLoading: false,
                errorMessages: [],
                selectedVm: null
            };
        }
        case virtualMachineEditActionTypes.VIRTUAL_MACHINE_EDIT_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message],
                selectedVm: null
            };
        }
        case virtualMachineEditActionTypes.VIRTUAL_MACHINE_EDIT_INPUT_VALIDATE: {
            return {
                isLoading: false,
                errorMessages: action.payload.validationErrors,
                selectedVm: action.payload.selectedVm
            };
        }
        case virtualMachineEditActionTypes.VIRTUAL_MACHINE_EDIT_NAVIGATE: {
            return {
                errorMessages: [],
                isLoading: false,
                selectedVm: action.payload.selectedVm
            }
        }
        default: {
            return state;
        }
    }
}