import { initialState, StateAccount } from "../../store/initialState";
import { accountActionTypes } from "../../actions/accountActions";

export function accountReducer(state = initialState.account, action: {type: string, payload: any}): StateAccount {
    switch (action.type) {
        case accountActionTypes.USER_LOAD_START: {
            return {
                isLoading: true,
                user: null
            };
        }
        case accountActionTypes.USER_LOAD_END: {
            return {
                isLoading: false,
                user: action.payload.user
            };
        }
        case accountActionTypes.USER_LOAD_ERROR: {
            return {
                isLoading: false,
                user: null
            };
        }
        default: {
            return state;
        }
    }
}