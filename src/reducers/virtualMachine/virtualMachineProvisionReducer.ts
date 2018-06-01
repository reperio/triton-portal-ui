import { initialState, StateVirtualMachineProvision } from "../../store/initialState";
import { virtualMachineActionTypes } from "../../actions/virtualMachineActions";

export function virtualMachineProvisionReducer(state = initialState.virtualMachines, action: {type: string, payload: any}): StateVirtualMachineProvision {
    switch (action.type) {
        case virtualMachineActionTypes.VIRTUAL_MACHINE_PROVISION_START: {
            return {
                isLoading: true
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_PROVISION_END: {
            return {
                isLoading: false
            };
        }
        case virtualMachineActionTypes.VIRTUAL_MACHINE_PROVISION_ERROR: {
            return {
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}