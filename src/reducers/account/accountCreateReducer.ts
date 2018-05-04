import {initialState, StateAccountCreate} from "../../store/initialState";
import { accountActionTypes } from "../../actions/accountActions";

export function accountCreateReducer(state = initialState.accountCreate, action: {type: string, payload: any}): StateAccountCreate {
    switch (action.type) {
        case accountActionTypes.USER_CREATE_START: {
            return {
                isLoading: true
            };
        }
        case accountActionTypes.USER_CREATE_END: {
            return {
                isLoading: false
            };
        }
        case accountActionTypes.USER_CREATE_ERROR: {
            return {
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}