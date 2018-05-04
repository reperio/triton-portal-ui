import { Dispatch } from "react-redux";
import { userService } from "../services/userService";
import { inputValidationService } from "../services/inputValidationService";
import { history } from '../store/history';
import { authService } from "../services/authService";
import CreateAccountModel from "../models/createAccountModel";
import EditAccountModel from '../models/editAccountModel';
import { change } from 'redux-form';
var Joi = require('joi-browser');


export const accountActionTypes = {
    USER_CREATE_START: "USER_CREATE_START",
    USER_CREATE_END: "USER_CREATE_END",
    USER_CREATE_ERROR: "USER_CREATE_ERROR",
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

export const createAccount = (account: CreateAccountModel) => async (dispatch: Dispatch<any>) => {

    const schema = Joi.object().keys({
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
        firstname: Joi.string().required().label('First name'),
        lastname: Joi.string().required().label('Last name'),
        email: Joi.string().email().required().label('Username'),
        ownerId: Joi.string().guid().required().label('Owner uuid'),
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        username: account.username,
        password: account.password, 
        firstname: account.firstname,
        lastname: account.lastname,
        email: account.email,
        ownerId: account.ownerId}, schema);

    if (account.password !== account.confirmPassword) {
        errors.push("Passwords do not match");
    }

    dispatch(change('accountCreateForm', 'errorMessages', errors));

    if (errors.length == 0) {
        dispatch({
            type: accountActionTypes.USER_CREATE_START,
            payload: {
                isLoading: true
            }
        });
        try {
            const vms = await userService.createUser(account);
            dispatch({
                type: accountActionTypes.USER_CREATE_END,
                payload: {
                    isLoading: false
                }
            });
            history.push('/login');
        } catch (e) {
            dispatch(change('accountCreateForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));
            dispatch({
                type: accountActionTypes.USER_CREATE_ERROR
            });
        }
    }
};

export const editAccount = (user: EditAccountModel, userId: string) => async (dispatch: Dispatch<any>) => {

    const schema = Joi.object().keys({
        currentPassword: Joi.string().required().label('Current password'),
        newPassword: Joi.string().optional().label('New password'),
        username: Joi.string().required().label('Username'),
        firstname: Joi.string().required().label('First name'),
        lastname: Joi.string().required().label('Last name'),
        email: Joi.string().email().required().label('Email'),
        sshKeys: Joi.array().items(
            Joi.object(
                {
                    key: Joi.string().required().label('Key'),
                    description: Joi.string().required().label('Description')
                }
            )
        ).optional().label('Ssh key')
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        currentPassword: user.currentPassword,
        newPassword: user.newPassword,
        username: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        sshKeys: user.sshKeys}, schema);

    if (user.newPassword !== user.confirmNewPassword) {
        errors.push("Passwords do not match");
    }

    dispatch(change('accountEditForm', 'errorMessages', errors));

    if (errors.length == 0) {
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
                dispatch(change('accountEditForm', 'errorMessages', ['Invalid password']));
                dispatch({
                    type: accountActionTypes.USER_EDIT_ERROR,
                });
            }
            else {
                dispatch({
                    type: accountActionTypes.USER_EDIT_END,
                    payload: {
                        isLoading: false
                    }
                });
            }
        } catch (e) {
            dispatch(change('accountEditForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));
            dispatch({
                type: accountActionTypes.USER_EDIT_ERROR,
            });
        }
    }
};

export const loadAccount = (userId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: accountActionTypes.USER_LOAD_START,
        payload: {
            hasLoaded: false
        }
    });
    try {
        const {data: {data: user}} = await userService.getUserById(userId);

        dispatch({
            type: accountActionTypes.USER_LOAD_END,
            payload: {
                hasLoaded: true,
                user: user
            }
        });
    } catch (e) {
        dispatch(change('accountEditForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));
        
        dispatch({
            type: accountActionTypes.USER_LOAD_ERROR
        });
    }
};