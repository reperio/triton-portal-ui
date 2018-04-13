import {initialState, StateAccountLoad} from "../store/initialState";
import { accountEditActionTypes } from "../actions/accountEditActions";

export function accountLoadReducer(state = initialState.accountLoad, action: {type: string, payload: any}): StateAccountLoad {
    switch (action.type) {
        case accountEditActionTypes.USER_LOAD_START: {
            return {
                hasLoaded: false,
                errorMessages: action.payload.validationErrors,
                user: []
            };
        }
        case accountEditActionTypes.USER_LOAD_END: {
            return {
                hasLoaded: true,
                errorMessages: [],
                user: action.payload.user
            };
        }
        case accountEditActionTypes.USER_LOAD_ERROR: {
            return {
                hasLoaded: false,
                errorMessages: [action.payload.message],
                user: []
            };
        }
        default: {
            return state;
        }
    }
}