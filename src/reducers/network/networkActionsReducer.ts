import {initialState, StateNetworkActions} from "../../store/initialState";
import { networkActionTypes } from "../../actions/networkActions";

export function networkActionsReducer(state = initialState.networkActions, action: {type: string, payload: any}): StateNetworkActions {
    switch (action.type) {
        case networkActionTypes.NETWORK_DELETE_START: {
            return {
                isLoading: true
            };
        }
        case networkActionTypes.NETWORK_DELETE_END: {
            return {
                isLoading: false
            };
        }
        case networkActionTypes.NETWORK_DELETE_ERROR: {
            return {
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}