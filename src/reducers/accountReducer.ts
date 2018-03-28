import {initialState, StateAccount} from "../store/initialState";
import { accountActionTypes } from "../actions/accountActions";

export function accountReducer(state = initialState.account, action: {type: string, payload: any}): StateAccount {
    switch (action.type) {
        case accountActionTypes.USER_CREATE_START: {
            return {
                isLoading: true,
                errorMessages: []
            };
        }
        case accountActionTypes.USER_CREATE_END: {
            return {
                isLoading: false,
                errorMessages: []
            };
        }
        case accountActionTypes.USER_CREATE_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        case accountActionTypes.INPUT_VALIDATE: {
            return {
                isLoading: false,
                errorMessages: action.payload.validationErrors
            };
        }
        default: {
            return state;
        }
    }
}