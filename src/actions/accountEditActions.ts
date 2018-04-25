import {Dispatch} from "react-redux";
import { userService } from "../services/userService";
import { inputValidationService } from "../services/inputValidationService";
import {history} from '../store/history';
import { authService } from "../services/authService";
import EditAccountModel from '../models/editAccountModel';

export const accountEditActionTypes = {
    ACCOUNT_EDIT_INPUT_VALIDATE: "ACCOUNT_EDIT_INPUT_VALIDATE",
    USER_EDIT_START: "USER_EDIT_START",
    USER_EDIT_END: "USER_EDIT_END",
    USER_EDIT_ERROR: "USER_EDIT_ERROR",
    USER_LOAD_START: "USER_LOAD_START",
    USER_LOAD_END: "USER_LOAD_END",
    USER_LOAD_ERROR: "USER_LOAD_ERROR"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const editAccount = (user: EditAccountModel, userId: string) => async (dispatch: Dispatch<any>) => {

    let errors = inputValidationService.validate([
        {name: "Current password", value: user.currentPassword, type: "string", required: true},
        {name: "Username", value: user.username, type: "string", required: false},
        {name: "First name", value: user.firstName, type: "string", required: false},
        {name: "Last name", value: user.lastName, type: "string", required: false},
        {name: "Email", value: user.email, type: "email", required: false},
        {name: "Ssh keys", value: user.sshKeys, type: "array", required: false}
    ]);

    if (user.newPassword !== user.confirmNewPassword) {
        errors.push("Passwords do not match");
    }

    if (errors.length > 0) {
        dispatch({
            type: accountEditActionTypes.ACCOUNT_EDIT_INPUT_VALIDATE,
            payload: {
                validationErrors: errors
            }
        });
    } else {
        dispatch({
            type: accountEditActionTypes.USER_EDIT_START,
            payload: {
                isLoading: true
            }
        });
        try {
            const sshKeys = user.sshKeys.map( sshKey => {
                return {
                    description: sshKey.description,
                    key: sshKey.key
                };
            });

            user.sshKeys = sshKeys;

            const {data: {data: validPassword}} = await userService.updateUser(userId, user);
            if (!validPassword) {
                dispatch({
                    type: accountEditActionTypes.USER_EDIT_ERROR,
                    payload: {
                        isLoading: false,
                        message: "Invalid password"
                    }
                });
            }
            else {
                dispatch({
                    type: accountEditActionTypes.USER_EDIT_END,
                    payload: {
                        isLoading: false
                    }
                });
            }
        } catch (e) {
            dispatch({
                type: accountEditActionTypes.USER_EDIT_ERROR,
                payload: {
                    isLoading: false,
                    message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
                }
            });
        }
    }
};

export const loadAccount = (userId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: accountEditActionTypes.USER_LOAD_START,
        payload: {
            hasLoaded: false
        }
    });
    try {
        const {data: {data: user}} = await userService.getUserById(userId);

        dispatch({
            type: accountEditActionTypes.USER_LOAD_END,
            payload: {
                hasLoaded: true,
                user: user
            }
        });
    } catch (e) {
        dispatch({
            type: accountEditActionTypes.USER_LOAD_ERROR,
            payload: {
                hasLoaded: false,
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};