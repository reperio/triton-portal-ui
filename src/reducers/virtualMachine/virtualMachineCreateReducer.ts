import {initialState, StateVirtualMachineCreate} from "../../store/initialState";
import { virtualMachineActionTypes } from "../../actions/virtualMachineActions";

export function virtualMachineCreateReducer(state = initialState.virtualMachines, action: {type: string, payload: any}): StateVirtualMachineCreate {
    switch (action.type) {
        case virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_START: {
            return {
                isLoading: true
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_END: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_ERROR: {
            return {
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}