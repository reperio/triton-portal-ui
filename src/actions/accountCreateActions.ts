import {Dispatch} from "react-redux";
import { userService } from "../services/userService";
import { inputValidationService } from "../services/inputValidationService";
import {history} from '../store/history';
import { authService } from "../services/authService";

export const accountCreateActionTypes = {
    USER_CREATE_START: "USER_CREATE_START",
    USER_CREATE_END: "USER_CREATE_END",
    USER_CREATE_ERROR: "USER_CREATE_ERROR",
    ACCOUNT_CREATE_INPUT_VALIDATE: "ACCOUNT_CREATE_INPUT_VALIDATE"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const createAccount = (username: string, password: string, confirmPassword: string, firstName: string, lastName: string, email: string) => async (dispatch: Dispatch<any>) => {

    let errors = inputValidationService.validate([
        {type: "Username", value: username},
        {type: "Password", value: password},
        {type: "First name", value: firstName},
        {type: "Last name", value: lastName},
        {type: "Email", value: email}
    ]);

    if (password !== confirmPassword) {
        errors.push("Passwords do not match");
    }

    if (errors.length > 0) {
        dispatch({
            type: accountCreateActionTypes.ACCOUNT_CREATE_INPUT_VALIDATE,
            payload: {
                validationErrors: errors
            }
        });
    } else {
        dispatch({
            type: accountCreateActionTypes.USER_CREATE_START,
            payload: {
                isLoading: true
            }
        });
        try {
            const vms = await userService.createUser(username, password, firstName, lastName, email);
            dispatch({
                type: accountCreateActionTypes.USER_CREATE_END,
                payload: {
                    isLoading: false
                }
            });
            history.push('/login');
        } catch (e) {
            dispatch({
                type: accountCreateActionTypes.USER_CREATE_ERROR,
                payload: {
                    isLoading: false,
                    message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
                }
            });
        }
    }
};