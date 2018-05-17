import {Dispatch} from "react-redux";
import { userService } from "../services/userService";
import { inputValidationService } from "../services/inputValidationService";
import {history} from '../store/history';
import { authService } from "../services/authService";

export const sshKeyActionTypes = {
    INPUT_VALIDATE: "INPUT_VALIDATE",
    SSHKEYS_CREATE_START: "SSHKEYS_CREATE_START",
    SSHKEYS_CREATE_END: "SSHKEYS_CREATE_END",
    SSHKEYS_CREATE_ERROR: "SSHKEYS_CREATE_ERROR",
    SSHKEYS_GET_START: "SSHKEYS_GET_START",
    SSHKEYS_GET_END: "SSHKEYS_GET_END",
    SSHKEYS_GET_ERROR: "SSHKEYS_GET_ERROR",
    SSHKEYS_ADD_REFRESH: "SSHKEYS_ADD_REFRESH",
    SSHKEYS_DELETE_REFRESH: "SSHKEYS_DELETE_REFRESH"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getSshKeysByUser = (userId: number) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: sshKeyActionTypes.SSHKEYS_GET_START
    });
    try {
        const sshKeys = await userService.getSshKeysByUser(userId);

        dispatch({
            type: sshKeyActionTypes.SSHKEYS_GET_END,
            payload: {
                sshKeys: sshKeys.data.data
            }
        });
    } catch (e) {
        dispatch({
            type: sshKeyActionTypes.SSHKEYS_GET_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const addSshKey = (sshKey: any, sshKeys: any[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: sshKeyActionTypes.SSHKEYS_ADD_REFRESH,
        payload: {
            sshKeys: sshKeys.push(sshKey)
        }
    });
};

export const deleteSshKey = (sshKey: any, sshKeys: any[]) => async (dispatch: Dispatch<any>) => {
    sshKeys = sshKeys.filter(function(item) { 
        return item !== sshKey
    })

    dispatch({
        type: sshKeyActionTypes.SSHKEYS_DELETE_REFRESH,
        payload: {
            sshKeys: sshKeys
        }
    });
};