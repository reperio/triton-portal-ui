import { initialState, StateAccount } from "../../store/initialState";
import { accountActionTypes } from "../../actions/accountActions";

export function accountReducer(state = initialState.account, action: {type: string, payload: any}): StateAccount {
    switch (action.type) {
        case accountActionTypes.USER_LOAD_START: {
            return {
                hasLoaded: false,
                user: state.user
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