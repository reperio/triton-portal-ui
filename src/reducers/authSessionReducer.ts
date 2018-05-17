import {initialState, StateAuthSession} from "../store/initialState";
import { authActionTypes } from "../actions/authActions";

export function authSessionReducer(state = initialState.authSession, action: {type: string, payload: any}): StateAuthSession {
    switch (action.type) {
        case authActionTypes.AUTH_LOGIN_START: {
            return {
                isAuthenticated: false,
                user: null,
                isLoading: true
            };
        }
        case authActionTypes.AUTH_LOGIN_ERROR: {
            return {
                isAuthenticated: false,
                user: null,
                isLoading: false
            };
        }
        case authActionTypes.AUTH_SET_TOKEN: {
            if (action.payload.user != null) {
                return {
                    isAuthenticated: true,
                    user: Object.assign({}, action.payload.user),
                    isLoading: false
                };
            } else {
                return {
                    isAuthenticated: false,
                    user: null,
                    isLoading: false
                };
            }
        }
        case authActionTypes.AUTH_CLEAR_TOKEN: {
            return Object.assign({}, state, {user: null, isAuthenticated: false});
        }
        default: {
            return state;
        }
    }
}