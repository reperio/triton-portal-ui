import {initialState, StateAccountEdit} from "../../store/initialState";
import { accountEditActionTypes } from "../../actions/accountEditActions";

export function accountEditReducer(state = initialState.accountEdit, action: {type: string, payload: any}): StateAccountEdit {
    switch (action.type) {
        case accountEditActionTypes.ACCOUNT_EDIT_INPUT_VALIDATE: {
            return {
                isLoading: false,
                errorMessages: action.payload.validationErrors
            };
        }
        case accountEditActionTypes.USER_EDIT_START: {
            return {
                isLoading: true,
                errorMessages: []
            };
        }
        case accountEditActionTypes.USER_EDIT_END: {
            return {
                isLoading: false,
                errorMessages: []
            };
        }
        case accountEditActionTypes.USER_EDIT_ERROR: {
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