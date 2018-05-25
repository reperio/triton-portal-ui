import {initialState, StateNetworks} from "../../store/initialState";
import { networkActionTypes } from "../../actions/networkActions";

export function networksReducer(state = initialState.networks, action: {type: string, payload: any}): StateNetworks {
    switch (action.type) {
        case networkActionTypes.NETWORKS_GET_START: {
            return {
                isLoading: true,
                networks: [],
                selectedNetworks: null
            };
        }
        case networkActionTypes.NETWORKS_GET_END: {
            return {
                networks: action.payload.networks,
                selectedNetworks: null,
                isLoading: false
            };
        }
        case networkActionTypes.NETWORKS_ERROR: {
            return {
                networks: [],
                selectedNetworks: null,
                isLoading: false
            };
        }
        case networkActionTypes.NETWORKS_SELECT: {
            return Object.assign({}, state, {selectedNetworks: action.payload.selectedNetworks});
        }
        default: {
            return state;
        }
    }
}