import {initialState, StateAccountEdit} from "../../store/initialState";
import { accountActionTypes } from "../../actions/accountActions";

export function accountEditReducer(state = initialState.accountEdit, action: {type: string, payload: any}): StateAccountEdit {
    switch (action.type) {
        case accountActionTypes.USER_EDIT_START: {
            return {
                isLoading: true
            };
        }
        case accountActionTypes.USER_EDIT_END: {
            return {
                isLoading: false
            };
        }
        case accountActionTypes.USER_EDIT_ERROR: {
            return {
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}