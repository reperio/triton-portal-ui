import {Dispatch} from "react-redux";

import { virtualMachineService } from "../services/virtualMachineService";
import { userService } from "../services/userService";
import { inputValidationService } from '../services/inputValidationService';

export const virtualMachineActionTypes = {
    VIRTUAL_MACHINES_GET_ALL_START: "VIRTUAL_MACHINES_GET_ALL_START",
    VIRTUAL_MACHINES_GET_ALL_END: "VIRTUAL_MACHINES_GET_ALL_END",
    VIRTUAL_MACHINES_GET_ALL_ERROR: "VIRTUAL_MACHINES_GET_ALL_ERROR",
    VIRTUAL_MACHINES_GET_BY_OWNER_START: "VIRTUAL_MACHINES_GET_BY_OWNER_START",
    VIRTUAL_MACHINES_GET_BY_OWNER_END: "VIRTUAL_MACHINES_GET_BY_OWNER_END",
    VIRTUAL_MACHINES_GET_BY_OWNER_ERROR: "VIRTUAL_MACHINES_GET_BY_OWNER_ERROR",
    INPUT_VALIDATE: "INPUT_VALIDATE",
    VIRTUAL_MACHINE_CREATE_START: "VIRTUAL_MACHINE_CREATE_START",
    VIRTUAL_MACHINE_CREATE_END: "VIRTUAL_MACHINE_CREATE_END",
    VIRTUAL_MACHINE_CREATE_ERROR: "VIRTUAL_MACHINE_CREATE_ERROR"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getAllVms = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_START,
        payload: {
            vms: [],
            isLoading: true
        }
    });
    try {
        const vms = await virtualMachineService.getAll();

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_END,
            payload: {
                vms: vms.data.data,
                isLoading: false
            }
        });
    } catch (e) {
        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null),
                isLoading: false
            }
        });
    }
};

export const getVmsByOwner = (owner_uuid: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_BY_OWNER_START,
        payload: {
            vms: [],
            isLoading: true
        }
    });
    try {
        const vms = await virtualMachineService.getVmsByOwnerUuid(owner_uuid);

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_BY_OWNER_END,
            payload: {
                vms: vms.data.data,
                isLoading: false
            }
        });
    } catch (e) {
        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_BY_OWNER_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null),
                isLoading: false
            }
        });
    }
};

export const createVm = (owner_uuid: string, alias: string, networks: string[], brand: string, billing_id: string, image_uuid: string) => async (dispatch: Dispatch<any>) => {

    let errors = inputValidationService.validate([
        {type: "OwnerId", value: owner_uuid},
        {type: "Alias", value: alias},
        {type: "Networks", value: networks},
        {type: "Brand", value: brand},
        {type: "BillingId", value: billing_id},
        {type: "ImageUuid", value: image_uuid}
    ]);

    if (errors.length > 0) {
        dispatch({
            type: virtualMachineActionTypes.INPUT_VALIDATE,
            payload: {
                validationErrors: errors
            }
        });
    } else {
        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_START,
            payload: {
                isLoading: true
            }
        });
        try {
            //const vms = await virtualMachineService.createVm(owner_uuid, alias, networks, brand, billing_id, image_uuid);
    
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_END,
                payload: {
                    isLoading: false
                }
            });
        } catch (e) {
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_ERROR,
                payload: {
                    isLoading: false,
                    message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
                }
            });
        }
    }
};