import {initialState, StateNetworkActions} from "../../store/initialState";
import { networkActionTypes } from "../../actions/networkActions";

export function networkActionsReducer(state = initialState.networkActions, action: {type: string, payload: any}): StateNetworkActions {
    switch (action.type) {
        case networkActionTypes.NETWORK_DELETE_START: {
            return {
                isLoading: true,
                errorMessages: []
            };
        }
        case networkActionTypes.NETWORK_DELETE_END: {
            return {
                isLoading: false,
                errorMessages: []
            };
        }
        case networkActionTypes.NETWORK_DELETE_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        default: {
            return state;
        }
    }
}