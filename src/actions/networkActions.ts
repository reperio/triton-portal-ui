import {Dispatch} from "react-redux";
import { networkService } from "../services/networkService";

export const networkActionTypes = {
    NETWORKS_GET_START: "NETWORKS_GET_START",
    NETWORKS_GET_END: "NETWORKS_GET_END",
    NETWORKS_ERROR: "NETWORKS_ERROR",
    NETWORKS_SELECT: "NETWORKS_SELECT"
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