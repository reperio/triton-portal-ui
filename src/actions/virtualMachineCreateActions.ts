import {Dispatch} from "react-redux";

import { virtualMachineService } from "../services/virtualMachineService";
import { userService } from "../services/userService";
import { inputValidationService } from '../services/inputValidationService';
import {history} from '../store/history';

export const virtualMachineCreateActionTypes = {
    VIRTUAL_MACHINE_CREATE_INPUT_VALIDATE: "VIRTUAL_MACHINE_CREATE_INPUT_VALIDATE",
    VIRTUAL_MACHINE_CREATE_START: "VIRTUAL_MACHINE_CREATE_START",
    VIRTUAL_MACHINE_CREATE_END: "VIRTUAL_MACHINE_CREATE_END",
    VIRTUAL_MACHINE_CREATE_ERROR: "VIRTUAL_MACHINE_CREATE_ERROR"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const createVm = (owner_uuid: string, alias: string, networks: any[], brand: string, billing_id: string, image_uuid: string) => async (dispatch: Dispatch<any>) => {

    let errors = inputValidationService.validate([
        {type: "OwnerId", value: owner_uuid},
        {type: "Alias", value: alias},
        {type: "Brand", value: brand},
        {type: "BillingId", value: billing_id},
        {type: "ImageUuid", value: image_uuid}
    ]);

    if (errors.length > 0) {
        dispatch({
            type: virtualMachineCreateActionTypes.VIRTUAL_MACHINE_CREATE_INPUT_VALIDATE,
            payload: {
                validationErrors: errors
            }
        });
    } else {
        dispatch({
            type: virtualMachineCreateActionTypes.VIRTUAL_MACHINE_CREATE_START,
            payload: {
                isLoading: true
            }
        });
        try {
            const vm = await virtualMachineService.createVm(owner_uuid, alias, networks, brand, billing_id, image_uuid);
    
            dispatch({
                type: virtualMachineCreateActionTypes.VIRTUAL_MACHINE_CREATE_END,
                payload: {
                    isLoading: false
                }
            });

            history.push('/virtual-machines');
        } catch (e) {
            dispatch({
                type: virtualMachineCreateActionTypes.VIRTUAL_MACHINE_CREATE_ERROR,
                payload: {
                    isLoading: false,
                    message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
                }
            });
        }
    }
};