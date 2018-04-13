import {initialState, StateAccountCreate} from "../store/initialState";
import { accountCreateActionTypes } from "../actions/accountCreateActions";

export function accountCreateReducer(state = initialState.accountCreate, action: {type: string, payload: any}): StateAccountCreate {
    switch (action.type) {
        case accountCreateActionTypes.USER_CREATE_START: {
            return {
                isLoading: true,
                errorMessages: []
            };
        }
        case accountCreateActionTypes.USER_CREATE_END: {
            return {
                isLoading: false,
                errorMessages: []
            };
        }
        case accountCreateActionTypes.USER_CREATE_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message]
            };
        }
        case accountCreateActionTypes.ACCOUNT_CREATE_INPUT_VALIDATE: {
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