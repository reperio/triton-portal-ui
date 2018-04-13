import {initialState, StateNetworks} from "../store/initialState";
import { networkActionTypes } from "../actions/networkActions";

export function networksReducer(state = initialState.networks, action: {type: string, payload: any}): StateNetworks {
    switch (action.type) {
        case networkActionTypes.NETWORKS_GET_START: {
            return {
                networks: [],
                errorMessages: [],
                selectedNetworks: null,
                isLoading: true
            };
        }
        case networkActionTypes.NETWORKS_GET_END: {
            return {
                networks: action.payload.networks,
                errorMessages: [],
                selectedNetworks: null,
                isLoading: false
            };
        }
        case networkActionTypes.NETWORKS_ERROR: {
            return {
                networks: [],
                errorMessages: [action.payload.message],
                selectedNetworks: null,
                isLoading: false
            };
        }
        case networkActionTypes.NETWORKS_SELECT: {
            return {
                networks: action.payload.networks,
                errorMessages: [],
                selectedNetworks: action.payload.selectedNetwork,
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}