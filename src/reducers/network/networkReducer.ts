import {initialState, StateNetworks} from "../../store/initialState";
import { networkActionTypes } from "../../actions/networkActions";

export function networksReducer(state = initialState.networks, action: {type: string, payload: any}): StateNetworks {
    switch (action.type) {
        case networkActionTypes.NETWORKS_GET_START: {
            return {
                hasLoaded: false,
                networks: [],
                selectedNetworks: null,
                isLoading: true
            };
        }
        case networkActionTypes.NETWORKS_GET_END: {
            return {
                hasLoaded: true,
                networks: action.payload.networks,
                selectedNetworks: null,
                isLoading: false
            };
        }
        case networkActionTypes.NETWORKS_ERROR: {
            return {
                hasLoaded: false,
                networks: [],
                selectedNetworks: null,
                isLoading: false
            };
        }
        case networkActionTypes.NETWORKS_SELECT: {
            return Object.assign({}, state, {hasLoaded: true, selectedNetworks: action.payload.selectedNetworks});
        }
        default: {
            return state;
        }
    }
}