import { Dispatch } from "react-redux";

import { authService } from "../services/authService";
import { userService } from "../services/userService";
import { inputValidationService } from "../services/inputValidationService";
import { history } from '../store/history';
var Joi = require('joi-browser');
import { change } from 'redux-form';
import { locationChange } from '../actions/navActions';
import UserModel from "../models/userModel";


export const authActionTypes = {
    AUTH_LOGIN_START: "AUTH_LOGIN_START",
    AUTH_LOGIN_END: "AUTH_LOGIN_END",
    AUTH_LOGIN_ERROR: "AUTH_LOGIN_ERROR",
    AUTH_SET_TOKEN: "AUTH_SET_TOKEN",
    AUTH_CLEAR_TOKEN: "AUTH_CLEAR_TOKEN",
    AUTH_SESSION_EXTEND: "AUTH_SESSION_EXTEND"
};

export const extendSession = () => async(dispatch: Dispatch<any>) => {
    hideExpirationDialog()(dispatch);

    dispatch({
        type: authActionTypes.AUTH_SESSION_EXTEND
    });

    authService.getIsLoggedIn();
}

export const logout = () => async (dispatch: Dispatch<any>) => {
    window.localStorage.removeItem("authToken");
    dispatch({
        type: authActionTypes.AUTH_CLEAR_TOKEN,
        payload: null
    });
    history.push('/login');
    locationChange(history.location.pathname)(dispatch);
};

export const updateTimeLeftOnToken = (showingExpirationDialog: boolean) => async(dispatch: Dispatch<any>) => {
    const tokenExpirationDate = authService.getTokenExpirationDate();
    if (tokenExpirationDate != null) {
        const time = Math.round((new Date()).getTime() / 1000);
        let diff = tokenExpirationDate - time;

        if (diff <= 0) {
            dispatch(change('navMenu', 'showingExpirationDialog', false));
            logout()(dispatch);
        } else if (diff < 60) {
            if (!showingExpirationDialog) {
                dispatch(change('navMenu', 'showingExpirationDialog', true));
            }
            dispatch(change('navMenu', 'timeLeftOnToken', diff--));
        }
    }
}

export const setAuthToken = (authToken: string, forceActionDispatch = false) => async (dispatch: Dispatch<any>) => {
    const parsedToken = authToken == null ? null : authService.parseJwt(authToken);
    const oldAuthToken = authService.readToken()
    const oldParsedToken = oldAuthToken == null ? null : authService.parseJwt(oldAuthToken);
    if (parsedToken != null && !authService.hasTokenExpired(parsedToken.exp)) {
        window.localStorage.setItem("authToken", authToken);
        if (forceActionDispatch || oldParsedToken == null || oldParsedToken.currentUserId !== parsedToken.currentUserId) {
            const user:UserModel = (await userService.getUserById(parsedToken.currentUserId)).data;
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

export const hideExpirationDialog = () => async (dispatch: Dispatch<any>) => { 
    dispatch(change('navMenu', 'showingExpirationDialog', false));
}

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
            locationChange(history.location.pathname)(dispatch);
        } catch (e) {
            dispatch(change('loginForm', 'errorMessages', [e.response.data.message]));

            dispatch({
                type: authActionTypes.AUTH_LOGIN_ERROR
            });
        }
    }
};