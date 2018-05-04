import {initialState, StateNetworkCreate} from "../../store/initialState";
import { networkActionTypes } from "../../actions/networkActions";

export function networkCreateReducer(state = initialState.networkCreate, action: {type: string, payload: any}): StateNetworkCreate {
    switch (action.type) {
        case networkActionTypes.NETWORK_CREATE_START: {
            return {
                isLoading: true
            };
        }
        case networkActionTypes.NETWORK_CREATE_END: {
            return {
                isLoading: false
            };
        }
        case networkActionTypes.NETWORK_CREATE_ERROR: {
            return {
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}