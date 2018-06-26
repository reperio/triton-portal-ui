import { Dispatch } from "react-redux";
import { networkService } from "../services/networkService";
import { inputValidationService } from "../services/inputValidationService";
import { change, submit } from 'redux-form';
import NetworkModel from "../models/networkModel";
var Joi = require('joi-browser');

export const networkActionTypes = {
    NETWORKS_GET_START: "NETWORKS_GET_START",
    NETWORKS_GET_END: "NETWORKS_GET_END",
    NETWORKS_ERROR: "NETWORKS_ERROR",
    NETWORKS_SELECT: "NETWORKS_SELECT",
    NETWORK_CREATE_START: "NETWORK_CREATE_START",
    NETWORK_CREATE_END: "NETWORK_CREATE_END",
    NETWORK_CREATE_ERROR: "NETWORK_CREATE_ERROR",
    NETWORK_DELETE_START: "NETWORK_DELETE_START",
    NETWORK_DELETE_END: "NETWORK_DELETE_END",
    NETWORK_DELETE_ERROR: "NETWORK_DELETE_ERROR"
};

export const getAllFabricNetworksByOwnerId = (ownerId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: networkActionTypes.NETWORKS_GET_START
    });
    
    try {
        const fabricVlanIds = (await networkService.getFabricLansByOwnerId(ownerId)).data.data.map((fabricVlan:any) => fabricVlan.vlan_id);
        const fabricNetworks:NetworkModel = (await networkService.getFabricNetworksByOwnerAndVLanIds(ownerId, fabricVlanIds)).data.data;

        dispatch({
            type: networkActionTypes.NETWORKS_GET_END,
            payload: {
                networks: fabricNetworks
            }
        });
        dispatch(change('networkForm', 'errorMessages', []));
    } catch (e) {
        dispatch(change('networkForm', 'errorMessages', [e.response.data.message]));

        dispatch({
            type: networkActionTypes.NETWORKS_ERROR
        });
    }
};

export const selectNetworks = (selectedNetworks: any[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: networkActionTypes.NETWORKS_SELECT,
        payload: {
            selectedNetworks: selectedNetworks
        }
    });
}

export const createFabricNetwork = (network: NetworkModel, ownerUuid: string) => async (dispatch: Dispatch<any>) => {
    
    const schema = Joi.object().keys({
        name: Joi.string().required().label('Name'),
        subnet: Joi.string().required().label('Subnet'),
        provisionStartIp: Joi.string().required().label('Provision start ip'),
        provisionEndIp: Joi.string().required().label('Provision end ip'),
        gateway: Joi.string().required().label('Gateway'),
        //internetNat: Joi.string().guid().required().label('Internet nat'),
        resolvers: Joi.array().items(
            Joi.object(
                {
                    ip: Joi.string().required().label('Resolver ip')
                }
            )
        ).optional().label('Resolvers'),
        description: Joi.string().optional().label('Description')
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        name: network.name,
        subnet: network.subnet, 
        provisionStartIp: network.provision_start_ip,
        provisionEndIp: network.provision_end_ip,
        gateway: network.gateway,
        //internetNat: network.internetNat,
        resolvers: network.resolvers,
        description: network.description}, schema);

    dispatch(change('networkCreateModal', 'errorMessages', errors));

    if (errors.length == 0) {
        dispatch({
            type: networkActionTypes.NETWORK_CREATE_START
        });
        
        try {
            const fabricVlan = await networkService.createFabricVlan(network.name, ownerUuid, network.description);
            const networks = await networkService.createFabricNetwork(network, ownerUuid, fabricVlan.data.data.vlan_id);

            dispatch({
                type: networkActionTypes.NETWORK_CREATE_END
            });

            hideCreateModal()(dispatch);

            getAllFabricNetworksByOwnerId(ownerUuid)(dispatch);

        } catch (e) {
            dispatch(change('networkCreateModal', 'errorMessages', [e.response.data.message]));
            
            dispatch({
                type: networkActionTypes.NETWORK_CREATE_ERROR
            });
        }
    }
};

export const deleteFabricNetwork = (owner_uuid: string, vlanId:number, uuid: string) => async (dispatch: Dispatch<any>) => {

    dispatch({
        type: networkActionTypes.NETWORK_DELETE_START
    });

    try {
        await networkService.deleteFabricNetwork(owner_uuid, vlanId, uuid);
        await networkService.deleteFabricVlan(owner_uuid, vlanId);

        dispatch({
            type: networkActionTypes.NETWORK_DELETE_END
        });

        hideDeleteModal()(dispatch);

        getAllFabricNetworksByOwnerId(owner_uuid)(dispatch);
        
    } catch (e) {
        dispatch(change('networkDeleteModal', 'errorMessages', [e.response.data.message]));

        dispatch({
            type: networkActionTypes.NETWORK_DELETE_ERROR
        });
    }
};

export const showDeleteModal = (row: any) => async (dispatch: Dispatch<any>) => {
    dispatch(change('networkForm', 'row', row));
    dispatch(change('networkForm', 'showingDeleteModal', true));
}

export const hideDeleteModal = () => async (dispatch: Dispatch<any>) => {
    dispatch(change('networkForm', 'showingDeleteModal', false));
}

export const showCreateModal = () => async (dispatch: Dispatch<any>) => {
    dispatch(change('networkForm', 'showingCreateModal', true));
}

export const hideCreateModal = () => async (dispatch: Dispatch<any>) => {
    dispatch(change('networkForm', 'showingCreateModal', false));
}

export const remoteFormSubmit = (formName: string) => async (dispatch: Dispatch<any>) => {
    dispatch(submit(formName));
}