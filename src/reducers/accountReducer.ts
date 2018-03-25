import {initialState, StateAccount} from "../store/initialState";
import { accountActionTypes } from "../actions/accountActions";

export function accountReducer(state = initialState.account, action: {type: string, payload: any}): StateAccount {
    switch (action.type) {
        case accountActionTypes.USER_CREATE_START: {
            return {
                isLoading: true,
                errorMessages: [],
                isError: false
            };
        }
        case accountActionTypes.USER_CREATE_END: {
            return {
                isLoading: false,
                errorMessages: [],
                isError: false
            };
        }
        case accountActionTypes.USER_CREATE_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message],
                isError: true
            };
        }
        case accountActionTypes.INPUT_VALIDATE: {
            return {
                isLoading: false,
                errorMessages: action.payload.validationErrors,
                isError: false
            };
        }
        default: {
            return state;
        }
    }
}