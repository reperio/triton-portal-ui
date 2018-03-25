import {initialState, StateAuthSession} from "../store/initialState";
import { authActionTypes } from "../actions/authActions";

export function authSessionReducer(state = initialState.authSession, action: {type: string, payload: any}): StateAuthSession {
    switch (action.type) {
        case authActionTypes.AUTH_LOGIN_PENDING: {
            return {
                isPending: true,
                isAuthenticated: false,
                isError: false,
                errorMessages: [],
                user: null,
                isLoading: true
            };
        }
        case authActionTypes.AUTH_LOGIN_SUCCESSFUL: {
            return {
                isPending: false,
                isAuthenticated: true,
                isError: false,
                errorMessages: [],
                user: action.payload.user,
                isLoading: false
            };
        }
        case authActionTypes.AUTH_LOGIN_ERROR: {
            return {
                isPending: false,
                isAuthenticated: false,
                isError: true,
                errorMessages: [action.payload.message],
                user: null,
                isLoading: false
            };
        }
        case authActionTypes.AUTH_SET_TOKEN: {
            if (action.payload.user != null) {
                return {
                    isPending: false,
                    isAuthenticated: true,
                    isError: false,
                    errorMessages: [],
                    user: Object.assign({}, action.payload.user),
                    isLoading: false
                };
            } else {
                return {
                    isPending: false,
                    isAuthenticated: false,
                    isError: false,
                    errorMessages: [],
                    user: null,
                    isLoading: false
                };
            }
        }
        case authActionTypes.AUTH_CLEAR_TOKEN: {
            return {
                isPending: false,
                isAuthenticated: false,
                isError: false,
                errorMessages: [],
                user: null,
                isLoading: false
            };
        }
        case authActionTypes.INPUT_VALIDATE: {
            return {
                isPending: false,
                isAuthenticated: false,
                isError: false,
                errorMessages: action.payload.validationErrors,
                user: null,
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}