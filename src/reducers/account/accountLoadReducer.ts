import {initialState, StateAccountLoad} from "../../store/initialState";
import { accountActionTypes } from "../../actions/accountActions";

export function accountLoadReducer(state = initialState.accountLoad, action: {type: string, payload: any}): StateAccountLoad {
    switch (action.type) {
        case accountActionTypes.USER_LOAD_START: {
            return {
                hasLoaded: false,
                user: []
            };
        }
        case accountActionTypes.USER_LOAD_END: {
            return {
                hasLoaded: true,
                user: action.payload.user
            };
        }
        case accountActionTypes.USER_LOAD_ERROR: {
            return {
                hasLoaded: false,
                user: []
            };
        }
        default: {
            return state;
        }
    }
}