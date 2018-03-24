import {Dispatch} from "react-redux";
import { userService } from "../services/userService";

export const createAccountActionTypes = {
    USER_CREATE_START: "USER_CREATE_START",
    USER_CREATE_END: "USER_CREATE_END",
    USER_CREATE_ERROR: "USER_CREATE_ERROR"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const createAccount = (username: string, password: string, firstName: string, lastName: string, email: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: createAccountActionTypes.USER_CREATE_START,
        payload: {
            isLoading: true
        }
    });
    try {
        const vms = await userService.createUser(username, password, firstName, lastName, email);

        dispatch({
            type: createAccountActionTypes.USER_CREATE_END,
            payload: {
                isLoading: false
            }
        });
    } catch (e) {
        dispatch({
            type: createAccountActionTypes.USER_CREATE_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};
