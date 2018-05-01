import {Dispatch} from "react-redux";

import { virtualMachineService } from "../services/virtualMachineService";
import { userService } from "../services/userService";
import { inputValidationService } from '../services/inputValidationService';
import { history } from '../store/history';

export const virtualMachineEditActionTypes = {
    VIRTUAL_MACHINE_EDIT_INPUT_VALIDATE: "VIRTUAL_MACHINE_EDIT_INPUT_VALIDATE",
    VIRTUAL_MACHINE_EDIT_START: "VIRTUAL_MACHINE_CREATE_START",
    VIRTUAL_MACHINE_EDIT_END: "VIRTUAL_MACHINE_EDIT_END",
    VIRTUAL_MACHINE_EDIT_ERROR: "VIRTUAL_MACHINE_EDIT_ERROR",
    VIRTUAL_MACHINE_EDIT_NAVIGATE: "VIRTUAL_MACHINE_EDIT_NAVIGATE"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const editVm = (owner_uuid: string,  uuid: string, selectedPackage: any) => async (dispatch: Dispatch<any>) => {

    let errors = inputValidationService.validate([
        {name: "Package", value: selectedPackage, type: "object", required: true}
    ]);

    if (errors.length > 0) {
        dispatch({
            type: virtualMachineEditActionTypes.VIRTUAL_MACHINE_EDIT_INPUT_VALIDATE,
            payload: {
                validationErrors: errors
            }
        });
    } else {
        dispatch({
            type: virtualMachineEditActionTypes.VIRTUAL_MACHINE_EDIT_START,
            payload: {
                isLoading: true
            }
        });
        try {
            const vm = await virtualMachineService.editVm(selectedPackage.uuid, uuid);
    
            dispatch({
                type: virtualMachineEditActionTypes.VIRTUAL_MACHINE_EDIT_END,
                payload: {
                    isLoading: false
                }
            });

            history.push('/virtual-machines');
        } catch (e) {
            dispatch({
                type: virtualMachineEditActionTypes.VIRTUAL_MACHINE_EDIT_ERROR,
                payload: {
                    isLoading: false,
                    message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
                }
            });
        }
    }
};

export const navigateToVirtualMachineEdit = (uuid: string) => async (dispatch: Dispatch<any>) => {
    const vm = await virtualMachineService.getVmByUuid(uuid);
    dispatch({
        type: virtualMachineEditActionTypes.VIRTUAL_MACHINE_EDIT_NAVIGATE,
        payload: {
            selectedVm: vm.data.data
        }
    });

    history.push('/edit-virtual-machine');
}