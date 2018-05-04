import {Dispatch} from "react-redux";

import { virtualMachineService } from "../services/virtualMachineService";
import { userService } from "../services/userService";
import { inputValidationService } from '../services/inputValidationService';
import {history} from '../store/history';
import { change } from 'redux-form';
import { packageService } from "../services/packageService";
import * as packageActions from '../actions/packagesActions';
var Joi = require('joi-browser');

export const virtualMachineActionTypes = {
    VIRTUAL_MACHINES_GET_ALL_START: "VIRTUAL_MACHINES_GET_ALL_START",
    VIRTUAL_MACHINES_GET_ALL_END: "VIRTUAL_MACHINES_GET_ALL_END",
    VIRTUAL_MACHINES_GET_ALL_ERROR: "VIRTUAL_MACHINES_GET_ALL_ERROR",
    VIRTUAL_MACHINES_GET_BY_OWNER_START: "VIRTUAL_MACHINES_GET_BY_OWNER_START",
    VIRTUAL_MACHINES_GET_BY_OWNER_END: "VIRTUAL_MACHINES_GET_BY_OWNER_END",
    VIRTUAL_MACHINES_GET_BY_OWNER_ERROR: "VIRTUAL_MACHINES_GET_BY_OWNER_ERROR",
    VIRTUAL_MACHINE_START_START: "VIRTUAL_MACHINE_START_START",
    VIRTUAL_MACHINE_START_END: "VIRTUAL_MACHINE_START_END",
    VIRTUAL_MACHINE_START_ERROR: "VIRTUAL_MACHINE_START_ERROR",
    VIRTUAL_MACHINE_STOP_START: "VIRTUAL_MACHINE_STOP_START",
    VIRTUAL_MACHINE_STOP_END: "VIRTUAL_MACHINE_STOP_END",
    VIRTUAL_MACHINE_STOP_ERROR: "VIRTUAL_MACHINE_STOP_ERROR",
    VIRTUAL_MACHINE_REBOOT_START: "VIRTUAL_MACHINE_REBOOT_START",
    VIRTUAL_MACHINE_REBOOT_END: "VIRTUAL_MACHINE_REBOOT_END",
    VIRTUAL_MACHINE_REBOOT_ERROR: "VIRTUAL_MACHINE_REBOOT_ERROR",
    VIRTUAL_MACHINE_DELETE_START: "VIRTUAL_MACHINE_DELETE_START",
    VIRTUAL_MACHINE_DELETE_END: "VIRTUAL_MACHINE_DELETE_END",
    VIRTUAL_MACHINE_DELETE_ERROR: "VIRTUAL_MACHINE_DELETE_ERROR",
    VIRTUAL_MACHINE_CREATE_START: "VIRTUAL_MACHINE_CREATE_START",
    VIRTUAL_MACHINE_CREATE_END: "VIRTUAL_MACHINE_CREATE_END",
    VIRTUAL_MACHINE_CREATE_ERROR: "VIRTUAL_MACHINE_CREATE_ERROR",
    VIRTUAL_MACHINE_EDIT_START: "VIRTUAL_MACHINE_EDIT_START",
    VIRTUAL_MACHINE_EDIT_END: "VIRTUAL_MACHINE_EDIT_END",
    VIRTUAL_MACHINE_EDIT_ERROR: "VIRTUAL_MACHINE_EDIT_ERROR",
    VIRTUAL_MACHINE_EDIT_NAVIGATE: "VIRTUAL_MACHINE_EDIT_NAVIGATE",
    VIRTUAL_MACHINE_EDIT_NAVIGATE_END: "VIRTUAL_MACHINE_EDIT_NAVIGATE_END",
    VIRTUAL_MACHINE_EDIT_NAVIGATE_ERROR: "VIRTUAL_MACHINE_EDIT_NAVIGATE_ERROR"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getAllVms = () => async (dispatch: Dispatch<any>) => {

    dispatch({
        type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_START
    });

    try {
        const vms = await virtualMachineService.getAll();

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_END,
            payload: {
                vms: vms.data.data
            }
        });
    } catch (e) {
        dispatch(change('virtualMachineForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_ERROR
        });
    }
};

export const getVmsByOwner = (owner_uuid: string) => async (dispatch: Dispatch<any>) => {

    dispatch({
        type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_BY_OWNER_START
    });

    try {
        const vms = await virtualMachineService.getVmsByOwnerUuid(owner_uuid);

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_BY_OWNER_END,
            payload: {
                vms: vms.data.data
            }
        });
    } catch (e) {
        dispatch(change('virtualMachineForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_BY_OWNER_ERROR
        });
    }
};

export const startVm = (owner_uuid: string, uuid: string) => async (dispatch: Dispatch<any>) => {

    dispatch({
        type: virtualMachineActionTypes.VIRTUAL_MACHINE_START_START
    });

    try {
        const vm = await virtualMachineService.startVm(owner_uuid, uuid);

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_START_END
        });
    } catch (e) {
        dispatch(change('virtualMachineForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_START_ERROR
        });
    }
};

export const stopVm = (owner_uuid: string, uuid: string) => async (dispatch: Dispatch<any>) => {

    dispatch({
        type: virtualMachineActionTypes.VIRTUAL_MACHINE_STOP_START
    });
    try {
        const vm = await virtualMachineService.stopVm(owner_uuid, uuid);

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_STOP_END
        });
    } catch (e) {
        dispatch(change('virtualMachineForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_STOP_ERROR
        });
    }
};

export const rebootVm = (owner_uuid: string, uuid: string) => async (dispatch: Dispatch<any>) => {

    dispatch({
        type: virtualMachineActionTypes.VIRTUAL_MACHINE_REBOOT_START,
        payload: {
            isLoading: true
        }
    });
    try {
        const vm = await virtualMachineService.rebootVm(owner_uuid, uuid);

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_REBOOT_END,
            payload: {
                isLoading: false
            }
        });
    } catch (e) {
        dispatch(change('virtualMachineForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_REBOOT_ERROR
        });
    }
};

export const deleteVm = (owner_uuid: string, uuid: string) => async (dispatch: Dispatch<any>) => {

    dispatch({
        type: virtualMachineActionTypes.VIRTUAL_MACHINE_DELETE_START
    });
    try {
        const vm = await virtualMachineService.deleteVm(owner_uuid, uuid);

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_DELETE_END
        });
    } catch (e) {
        dispatch(change('virtualMachineForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_DELETE_ERROR
        });
    }
};

export const createVm = (owner_uuid: string, alias: string, networks: any[], brand: string, selectedPackage: any, imageUuid: string) => async (dispatch: Dispatch<any>) => {

    const schema = Joi.object().keys({
        alias: Joi.string().required().label('Alias'),
        brand: Joi.string().required().label('Brand'),
        selectedPackage: Joi.string().guid().required().label('Selected package'),
        networks: Joi.array().items(
            Joi.string().guid()
        ).min(1).required().label('Networks'),
        imageUuid: Joi.string().guid().optional().label('Image uuid')
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        alias,
        brand,
        selectedPackage: selectedPackage !== null ? selectedPackage.uuid : null,
        networks: networks !== null ? networks.map(x => x.uuid) : [],
        imageUuid}, schema);

    dispatch(change('virtualMachineCreateForm', 'errorMessages', errors));
    
    if (errors.length == 0) {
        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_START
        });

        try {
            const vm = await virtualMachineService.createVm(owner_uuid, alias, networks.map(x => x.uuid), brand, selectedPackage.uuid, imageUuid);
    
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_END
            });

            history.push('/virtual-machines');
        } catch (e) {
            dispatch(change('virtualMachineCreateForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_ERROR
            });
        }
    }
};

export const editVm = (owner_uuid: string,  uuid: string, alias: string, image_uuid: string, selectedPackage: any) => async (dispatch: Dispatch<any>) => {

    const schema = Joi.object().keys({
        selectedPackage: Joi.object().required().label('Selected package'),
        alias: Joi.string().required().label('Alias'),
        image_uuid: Joi.string().guid().required().label('Image')
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        selectedPackage, 
        alias, 
        image_uuid}, schema);

    dispatch(change('virtualMachineEditForm', 'errorMessages', errors));
    if (errors.length == 0) {
        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_START
        });
        try {
            const vm = await virtualMachineService.editVm(selectedPackage.uuid, uuid, alias, image_uuid);
    
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_END
            });

            history.push('/virtual-machines');
        } catch (e) {
            dispatch(change('virtualMachineEditForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));

            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_ERROR
            });
        }
    }
};

export const navigateToVirtualMachineEdit = (vm: any) => async (dispatch: Dispatch<any>) => {

    dispatch({
        type: virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_NAVIGATE
    });

    try {
        const packages = (await packageService.getPackages()).data.data;
        
        const filteredPackages = packages.filter((_package:any) => _package.uuid == vm.billing_id);
        const selectedPackage = filteredPackages.length > 0 ? filteredPackages[0] : null;
        dispatch(change('packageInformation', 'selectedPackage', selectedPackage));
        dispatch(change('virtualMachineEditForm', 'selectedVm', vm));
        dispatch(change('virtualMachineEditForm', 'packages', packages));

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_NAVIGATE_END
        });

        history.push('/edit-virtual-machine');

    } catch (e) {
        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_NAVIGATE_ERROR
        });

        dispatch(change('virtualMachineForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));
    }
}