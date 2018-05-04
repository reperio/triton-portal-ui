import { Dispatch } from "react-redux";

import { authService } from "../services/authService";
import { userService } from "../services/userService";
import { inputValidationService } from "../services/inputValidationService";
import { history } from '../store/history';
var Joi = require('joi-browser');
import { change } from 'redux-form';


export const authActionTypes = {
    AUTH_LOGIN_START: "AUTH_LOGIN_START",
    AUTH_LOGIN_END: "AUTH_LOGIN_END",
    AUTH_LOGIN_ERROR: "AUTH_LOGIN_ERROR",
    AUTH_SET_TOKEN: "AUTH_SET_TOKEN",
    AUTH_CLEAR_TOKEN: "AUTH_CLEAR_TOKEN"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        case 400:
        case 401:
        case 403:
            return "Invalid username or password";
        default:
            return "An error occurred, please contact your system administrator"}
}

export const logout = () => async (dispatch: Dispatch<any>) => {
    window.localStorage.removeItem("authToken");
    dispatch({
        type: authActionTypes.AUTH_CLEAR_TOKEN,
        payload: null
    });
    history.push('/login');
};

export const getAuthToken = () => {
    return window.localStorage.getItem("authToken");
};

export const setAuthToken = (authToken: string, forceActionDispatch = false) => async (dispatch: Dispatch<any>) => {
    const parsedToken = authToken == null ? null : authService.parseJwt(authToken);
    const oldAuthToken = getAuthToken();
    const oldParsedToken = oldAuthToken == null ? null : authService.parseJwt(oldAuthToken);
    if (parsedToken != null && !authService.hasTokenTimeExpired(parsedToken)) {
        window.localStorage.setItem("authToken", authToken);
        if (forceActionDispatch || oldParsedToken == null || oldParsedToken.currentUserId !== parsedToken.currentUserId) {
            const {data: user} = await userService.getUserById(parsedToken.currentUserId);
            dispatch({
                type: authActionTypes.AUTH_SET_TOKEN,
                payload: {authToken, user}
            });
        }
    } else {
        if (forceActionDispatch || oldAuthToken != null) {
            dispatch({
                type: authActionTypes.AUTH_CLEAR_TOKEN,
                payload: null
            });
            history.push('/login');
        }
    }
};

export const submitAuth = (email: string, password: string) => async (dispatch: Dispatch<any>) => {
    
    const schema = Joi.object().keys({
        password: Joi.string().required().label('Password'),
        email: Joi.string().email().required().label('Email')
    }).options({ abortEarly: false });

    const errors = await inputValidationService.validate({password, email}, schema);

    dispatch(change('loginForm', 'errorMessages', errors));

    if (errors.length == 0) {
        dispatch({
            type: authActionTypes.AUTH_LOGIN_START
        });
    
        try {
            await authService.login(email, password);

            history.push('/home');
        } catch (e) {
            dispatch(change('loginForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));

            dispatch({
                type: authActionTypes.AUTH_LOGIN_ERROR
            });
        }
    }
};