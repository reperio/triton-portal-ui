import {Dispatch} from "react-redux";
import { virtualMachineService } from "../services/virtualMachineService";
import { userService } from "../services/userService";
import { inputValidationService } from '../services/inputValidationService';
import { packageService } from "../services/packageService";
import { imageService } from "../services/imageService";
import { history } from '../store/history';
import { change, submit, formValueSelector } from 'redux-form';
import { store } from "../store/store";
import nic from '../models/nicModel';
import VirtualMachineModel from "../models/virtualMachineModel";
import PackageModel from "../models/packageModel";
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
    VIRTUAL_MACHINE_REPROVISION_START: "VIRTUAL_MACHINE_REPROVISION_START",
    VIRTUAL_MACHINE_REPROVISION_END: "VIRTUAL_MACHINE_REPROVISION_END",
    VIRTUAL_MACHINE_REPROVISION_ERROR: "VIRTUAL_MACHINE_REPROVISION_ERROR",
    VIRTUAL_MACHINE_RENAME_START: "VIRTUAL_MACHINE_RENAME_START",
    VIRTUAL_MACHINE_RENAME_END: "VIRTUAL_MACHINE_RENAME_END",
    VIRTUAL_MACHINE_RENAME_ERROR: "VIRTUAL_MACHINE_RENAME_ERROR",
    VIRTUAL_MACHINE_RESIZE_START: "VIRTUAL_MACHINE_RESIZE_START",
    VIRTUAL_MACHINE_RESIZE_END: "VIRTUAL_MACHINE_RESIZE_END",
    VIRTUAL_MACHINE_RESIZE_ERROR: "VIRTUAL_MACHINE_RESIZE_ERROR",
    VIRTUAL_MACHINE_EDIT_NICS_START: "VIRTUAL_MACHINE_EDIT_NICS_START",
    VIRTUAL_MACHINE_EDIT_NICS_END: "VIRTUAL_MACHINE_EDIT_NICS_END",
    VIRTUAL_MACHINE_EDIT_NICS_ERROR: "VIRTUAL_MACHINE_EDIT_NICS_ERROR"
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
        const vms: VirtualMachineModel = (await virtualMachineService.getAll()).data.data;

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_ALL_END,
            payload: {
                vms: vms
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
        const vms: VirtualMachineModel = (await virtualMachineService.getVmsByOwnerUuid(owner_uuid)).data.data;

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINES_GET_BY_OWNER_END,
            payload: {
                vms: vms
            }
        });

        dispatch(change('virtualMachineForm', 'errorMessages', []));
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

        getVmsByOwner(owner_uuid)(dispatch);

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_START_END
        });
    } catch (e) {
        dispatch(change('virtualMachineForm', 'errorMessages', [e.response.data.message]));

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

        getVmsByOwner(owner_uuid)(dispatch);

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_STOP_END
        });
    } catch (e) {
        dispatch(change('virtualMachineForm', 'errorMessages', [e.response.data.message]));

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

        dispatch(change('virtualMachineDeleteModal', 'row', null));

        hideDeleteModal()(dispatch);

        getVmsByOwner(owner_uuid)(dispatch);

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_DELETE_END
        });
    } catch (e) {
        dispatch(change('virtualMachineDeleteModal', 'errorMessages', [e.response.data.message]));

        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_DELETE_ERROR
        });
    }
};

export const showDeleteModal = (row: any) => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'row', row));
    dispatch(change('virtualMachineForm', 'showingDeleteModal', true));
}

export const hideDeleteModal = () => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'showingDeleteModal', false));
}

export const createVm = (owner_uuid: string, alias: string, networks: nic[], brand: string, selectedPackage: PackageModel, imageUuid: string) => async (dispatch: Dispatch<any>) => {

    const schema = Joi.object().keys({
        alias: Joi.string().required(),
        brand: Joi.string().required().invalid(['-- Select a brand --']),
        selectedPackage: Joi.string().guid().required().label('Package'),
        networks: Joi.array().items(Joi.object({
            network_uuid: Joi.string().guid().required().label('NIC network'),
            primary: Joi.boolean()
        })
        ).min(1).required().label('Network interfaces'),
        imageUuid: Joi.string().guid().optional()
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        alias,
        brand,
        selectedPackage: selectedPackage !== null ? selectedPackage.uuid : null,
        networks,
        imageUuid}, schema);

    let networkPrimaryCount = 0;

    if (networks !== undefined && networks.length !== 0) {
        networks.map((network: nic) => {
            if (network.primary) {
                networkPrimaryCount++;
            }
        });
    
        if (networkPrimaryCount === 0) {
            errors.push('A primary NIC must be selected.');
        }
    }

    dispatch(change('virtualMachineCreateModal', 'errorMessages', errors));
    
    if (errors.length == 0) {
        dispatch({
            type: virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_START
        });

        try {
            const vm = await virtualMachineService.createVm(owner_uuid, alias, networks, brand, selectedPackage.uuid, imageUuid, selectedPackage.quota);
    
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_END
            });

            hideCreateModal()(dispatch);

            getVmsByOwner(owner_uuid)(dispatch);

        } catch (e) {
            dispatch(change('virtualMachineCreateModal', 'errorMessages', [e.response.data.message]));
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_CREATE_ERROR
            });
        }
    }
};

export const showCreateModal = () => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'showingCreateModal', true));
}

export const hideCreateModal = () => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'showingCreateModal', false));
}

export const remoteFormSubmit = (formName: string) => async (dispatch: Dispatch<any>) => {
    dispatch(submit(formName));
}

export const renameVm = (owner_uuid: string, uuid: string, alias: string) => async (dispatch: Dispatch<any>) => {
    const schema = Joi.object().keys({
        alias: Joi.string().required().label('Alias')
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        alias}, schema);

    dispatch(change('virtualMachineRenameModal', 'errorMessages', errors));
    if (errors.length == 0) {
        try {
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_RENAME_START
            });

            await virtualMachineService.renameVm(uuid, alias);

            hideRenameModal()(dispatch);

            getVmsByOwner(owner_uuid)(dispatch);
    
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_RENAME_END
            });
        } catch (e) {
            dispatch(change('virtualMachineRenameModal', 'errorMessages', [e.response.data.message]));

            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_RENAME_ERROR
            });
        }
    }
}

export const showRenameModal = (row: any) => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'row', row));
    dispatch(change('virtualMachineForm', 'showingRenameModal', true));
}

export const hideRenameModal = () => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'showingRenameModal', false));
}

export const reprovisionVm = (owner_uuid: string, uuid: string, image_uuid: string) => async (dispatch: Dispatch<any>) => {
    const schema = Joi.object().keys({
        image_uuid: Joi.string().guid().required().label('Image')
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        image_uuid}, schema);

    dispatch(change('virtualMachineReprovisionModal', 'errorMessages', errors));
    if (errors.length == 0) {
        try {
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_REPROVISION_START
            });

            await virtualMachineService.reprovisionVm(uuid, image_uuid);

            hideReprovisionModal()(dispatch);

            getVmsByOwner(owner_uuid)(dispatch);
    
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_REPROVISION_END
            });
        } catch (e) {
            dispatch(change('virtualMachineReprovisionModal', 'errorMessages', [e.response.data.message]));

            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_REPROVISION_ERROR
            });
        }
    }
}

export const showReprovisionModal = (row: any) => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'row', row));
    dispatch(change('virtualMachineForm', 'showingReprovisionModal', true));
}

export const hideReprovisionModal = () => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'showingReprovisionModal', false));
}

export const resizeVm = (owner_uuid: string, uuid: string, billing_id: string) => async (dispatch: Dispatch<any>) => {
    const schema = Joi.object().keys({
        billing_id: Joi.string().guid().required().label('Package')
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        billing_id}, schema);

    dispatch(change('virtualMachineResizeModal', 'errorMessages', errors));
    if (errors.length == 0) {
        try {
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_RESIZE_START
            });

            await virtualMachineService.resizeVm(uuid, billing_id);

            hideResizeModal()(dispatch);

            getVmsByOwner(owner_uuid)(dispatch);
    
            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_RESIZE_END
            });
        } catch (e) {
            dispatch(change('virtualMachineResizeModal', 'errorMessages', [e.response.data.message]));

            dispatch({
                type: virtualMachineActionTypes.VIRTUAL_MACHINE_RESIZE_ERROR
            });
        }
    }
}

export const showResizeModal = (row: any) => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'row', row));
    dispatch(change('virtualMachineForm', 'showingResizeModal', true));
}

export const hideResizeModal = () => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'showingResizeModal', false));
}

export const selectImage = (formName: string, selectedImage : any) => async (dispatch: Dispatch<any>) => {
    dispatch(change(formName, 'selectedImage', selectedImage));
}

export const selectPackage = (selectedPackage : any) => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineResizeModal', 'selectedPackage', selectedPackage));
}

export const selectPrimaryNic = (nicIndex: number, form: string) => async (dispatch: Dispatch<any>) => {

    const state = store.getState();

    const selector = formValueSelector(form);

    const nics = selector(state, 'nics');

    const newNics = nics.map((nic: any, i: number) => Object.assign({}, nic, {primary: i === nicIndex}));

    dispatch(change(form, 'nics', newNics));
}

export const editVmNics = (nics: any[], id: string, ownerUuid: string) => async (dispatch: Dispatch<any>) => {

    let newNetworksObject: any[] = [];

    nics.map(network => {
        newNetworksObject.push({
            primary: network.primary !== undefined ? network.primary: false,
            uuid: network.network_uuid,
            mac: network.mac !== undefined ? network.mac: ""
        });
    });

    const schema = Joi.object().keys({
        newNetworksObject: Joi.array().items(Joi.object({
            uuid: Joi.string().guid().required().label('NIC network'),
            primary: Joi.boolean().required(),
            mac: Joi.string().allow('').optional()
        })
        ).optional(),
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        newNetworksObject}, schema);

    dispatch(change('virtualMachineEditNicsModal', 'errorMessages', errors));

    if (errors.length == 0) {
        try {
            dispatch({ type: virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_NICS_START });

            await virtualMachineService.editNics(newNetworksObject, id);

            hideNicModal()(dispatch);
            
            getVmsByOwner(ownerUuid)(dispatch);
            
            dispatch({ type: virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_NICS_END });
        } catch(e) {
            dispatch(change('virtualMachineEditNicsModal', 'errorMessages', [e.response.data.message]));

            dispatch({ type: virtualMachineActionTypes.VIRTUAL_MACHINE_EDIT_NICS_ERROR });
        }
    }
}

export const showNicModal = (row: any) => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'row', row));
    dispatch(change('virtualMachineForm', 'showingNicModal', true));
}

export const hideNicModal = () => async (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'showingNicModal', false));
}