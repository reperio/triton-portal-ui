import { Dispatch } from "react-redux";
import { networkService } from "../services/networkService";
import CreateNetworkModel from '../models/createNetworkModel';
import { inputValidationService } from "../services/inputValidationService";
import { history } from '../store/history';

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
    NETWORK_DELETE_ERROR: "NETWORK_DELETE_ERROR",
    NETWORK_CREATE_VALIDATE: "NETWORK_CREATE_VALIDATE"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getAllFabricNetworksByOwnerId = (ownerId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: networkActionTypes.NETWORKS_GET_START,
        payload: {
            packages:[]
        }
    });
    
    try {
        const fabricVlans = (await networkService.getFabricLansByOwnerId(ownerId)).data.data;
        const networks: any[] = await Promise.all(fabricVlans.map(async (vlan:any): Promise<any> => {
            let network = (await networkService.getFabricNetworksByOwnerAndVLanId(ownerId, vlan.vlan_id)).data.data[0];
            return network;
        }));

        dispatch({
            type: networkActionTypes.NETWORKS_GET_END,
            payload: {
                networks: networks.filter(function(n){ return n !== undefined }) 
            }
        });
    } catch (e) {
        dispatch({
            type: networkActionTypes.NETWORKS_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const selectNetworks = (networks: any[], selectedNetworks: any[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: networkActionTypes.NETWORKS_SELECT,
        payload: {
            networks: networks,
            selectedNetworks: selectedNetworks
        }
    });
}

export const createFabricNetwork = (network: CreateNetworkModel, ownerUuid: string) => async (dispatch: Dispatch<any>) => {
    
    let errors = inputValidationService.validate([
        {name: "Name", value: network.name, type: "string", required: true},
        {name: "Subnet", value: network.subnet, type: "string", required: true},
        {name: "Provision start ip", value: network.provisionStartIp, type: "string", required: true},
        {name: "Provision end ip", value: network.provisionEndIp, type: "string", required: true},
        {name: "Gateway", value: network.gateway, type: "string", required: false},
        {name: "Internet nat", value: network.internetNat, type: "boolean", required: false},
        {name: "Resolvers", value: network.resolvers, type: "array", required: false}
    ]);

    if (errors.length > 0) {
        dispatch({
            type: networkActionTypes.NETWORK_CREATE_VALIDATE,
            payload: {
                validationErrors: errors
            }
        });
    } else {
        dispatch({
            type: networkActionTypes.NETWORK_CREATE_START,
            payload: {
                packages:[]
            }
        });
        
        try {
            const fabricVlan = await networkService.createFabricVlan(network.name, ownerUuid, network.description);
            const networks = await networkService.createFabricNetwork(network, ownerUuid, fabricVlan.data.data.vlan_id);
            dispatch({
                type: networkActionTypes.NETWORK_CREATE_END,
                payload: {
                    isLoading: false
                }
            });
            history.push('/networks');
        } catch (e) {
            dispatch({
                type: networkActionTypes.NETWORK_CREATE_ERROR,
                payload: {
                    message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
                }
            });
        }
    }
};

export const deleteFabricNetwork = (owner_uuid: string, vlanId:number, uuid: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: networkActionTypes.NETWORK_DELETE_START,
        payload: {
            isLoading: true
        }
    });
    try {
        const vm = await networkService.deleteFabricNetwork(owner_uuid, vlanId, uuid);

        dispatch({
            type: networkActionTypes.NETWORK_DELETE_END,
            payload: {
                isLoading: false
            }
        });
    } catch (e) {
        dispatch({
            type: networkActionTypes.NETWORK_DELETE_ERROR,
            payload: {
                isLoading: false,
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};