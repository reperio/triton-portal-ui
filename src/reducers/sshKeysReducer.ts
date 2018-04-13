import {initialState, StateSshKeys} from "../store/initialState";
import { sshKeyActionTypes } from "../actions/sshKeyActions";

export function sshKeysReducer(state = initialState.sshKeys, action: {type: string, payload: any}): StateSshKeys {
    switch (action.type) {
        case sshKeyActionTypes.SSHKEYS_CREATE_START: {
            return {
                isLoading: true,
                errorMessages: [],
                sshKeys: []
            };
        }
        case sshKeyActionTypes.SSHKEYS_CREATE_END: {
            return {
                isLoading: false,
                errorMessages: [],
                sshKeys: []
            };
        }
        case sshKeyActionTypes.SSHKEYS_CREATE_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message],
                sshKeys: []
            };
        }
        case sshKeyActionTypes.SSHKEYS_GET_START: {
            return {
                isLoading: true,
                errorMessages: [],
                sshKeys: []
            };
        }
        case sshKeyActionTypes.SSHKEYS_GET_END: {
            return {
                isLoading: false,
                errorMessages: [],
                sshKeys: action.payload.sshKeys
            };
        }
        case sshKeyActionTypes.SSHKEYS_GET_ERROR: {
            return {
                isLoading: false,
                errorMessages: [action.payload.message],
                sshKeys: []
            };
        }
        case sshKeyActionTypes.SSHKEYS_ADD_REFRESH: {
            return {
                isLoading: false,
                errorMessages: [],
                sshKeys: action.payload.sshKeys
            };
        }
        case sshKeyActionTypes.SSHKEYS_DELETE_REFRESH: {
            return {
                isLoading: false,
                errorMessages: [],
                sshKeys: action.payload.sshKeys
            };
        }
        case sshKeyActionTypes.INPUT_VALIDATE: {
            return {
                isLoading: false,
                errorMessages: action.payload.validationErrors,
                sshKeys: []
            };
        }
        default: {
            return state;
        }
    }
}