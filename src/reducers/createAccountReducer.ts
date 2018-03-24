import {initialState, StateCreateAccount} from "../store/initialState";
import { createAccountActionTypes } from "../actions/createAccountActions";

export function createAccountReducer(state = initialState.createAccount, action: {type: string, payload: any}): StateCreateAccount {
    switch (action.type) {
        case createAccountActionTypes.USER_CREATE_START: {
            return {
                //vms: [],
                isLoading: true
            };
        }
        case createAccountActionTypes.USER_CREATE_END: {
            return {
                //vms: action.payload.vms,
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}