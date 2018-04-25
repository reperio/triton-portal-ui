import {initialState, StateVirtualMachineCreate} from "../../store/initialState";
import { virtualMachineCreateActionTypes } from "../../actions/virtualMachineCreateActions";

export function virtualMachineCreateReducer(state = initialState.virtualMachines, action: {type: string, payload: any}): StateVirtualMachineCreate {
    switch (action.type) {
        case virtualMachineCreateActionTypes.VIRTUAL_MACHINE_CREATE_START: {
            return {
                isLoading: true,
                errorMessages: []
            };
        }
        case virtualMachineCreateActionTypes.VIRTUAL_MACHINE_CREATE_END: {
            return {
                isLoading: false,
                errorMessages: []
            };
        }
        case virtualMachineCreateActionTypes.VIRTUAL_MACHINE_CREATE_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        case virtualMachineCreateActionTypes.VIRTUAL_MACHINE_CREATE_INPUT_VALIDATE: {
            return {
                isLoading: false,
                errorMessages: action.payload.validationErrors
            };
        }
        default: {
            return state;
        }
    }
}