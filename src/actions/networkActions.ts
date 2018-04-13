import {Dispatch} from "react-redux";
import { networkService } from "../services/networkService";

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

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getAllNetworksByOwnerId = (ownerId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: networkActionTypes.NETWORKS_GET_START,
        payload: {
            packages:[]
        }
    });
    
    try {
        const networks = await networkService.getNetworksByOwner(ownerId);
        dispatch({
            type: networkActionTypes.NETWORKS_GET_END,
            payload: {
                networks: networks.data.data
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

export const createNetwork = (stuff: any) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: networkActionTypes.NETWORK_CREATE_START,
        payload: {
            packages:[]
        }
    });
    
    try {
        //const networks = await networkService.createNetwork(stuff);
        dispatch({
            type: networkActionTypes.NETWORK_CREATE_END,
            payload: {
                isLoading: false
            }
        });
    } catch (e) {
        dispatch({
            type: networkActionTypes.NETWORK_CREATE_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const deleteNetwork = (owner_uuid: string, uuid: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: networkActionTypes.NETWORK_DELETE_START,
        payload: {
            isLoading: true
        }
    });
    try {
        //const vm = await virtualMachineService.deleteVm(owner_uuid, uuid);

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

//