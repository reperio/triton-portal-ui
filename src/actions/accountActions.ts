import { Dispatch } from "react-redux";
import { userService } from "../services/userService";
import { inputValidationService } from "../services/inputValidationService";
import { history } from '../store/history';
import { authService } from "../services/authService";
import { change } from 'redux-form';
import UserModel from "../models/userModel";
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

export const createAccount = (account: UserModel) => async (dispatch: Dispatch<any>) => {

    const schema = Joi.object().keys({
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
        firstName: Joi.string().required().label('First name'),
        lastName: Joi.string().required().label('Last name'),
        email: Joi.string().email().required().label('Username'),
        ownerUuid: Joi.string().guid().required().label('Owner uuid'),
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        username: account.username,
        password: account.password, 
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        ownerUuid: account.ownerUuid}, schema);

    if (account.password !== account.confirmNewPassword) {
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
            dispatch(change('accountCreateForm', 'errorMessages', [e.response.data.message]));
            dispatch({
                type: accountActionTypes.USER_CREATE_ERROR
            });
        }
    }
};

export const editAccount = (user: UserModel, userId: string) => async (dispatch: Dispatch<any>) => {
    
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

    const sshKeys = user.sshKeys.map( sshKey => {
        return {
            description: sshKey.description,
            key: sshKey.key
        };
    });

    let errors = await inputValidationService.validate({
        currentPassword: user.password,
        newPassword: user.newPassword,
        username: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        sshKeys}, schema);

    if (user.newPassword !== user.confirmNewPassword) {
        errors.push("Passwords do not match");
    }

    dispatch(change('accountEditForm', 'errorMessages', errors));

    if (errors.length == 0) {
        try {
            user.sshKeys = sshKeys;

            dispatch({
                type: accountActionTypes.USER_EDIT_START
            });

            await userService.updateUser(userId, user);

            dispatch({
                type: accountActionTypes.USER_EDIT_END
            });

            history.push('/home');
        } catch (e) {
            dispatch(change('accountEditForm', 'errorMessages', [e.response.data.message]));
            dispatch({
                type: accountActionTypes.USER_EDIT_ERROR,
            });
        }
    }
};

export const getUserById = (userId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: accountActionTypes.USER_LOAD_START
    });
    try {
        const user: UserModel = (await userService.getUserById(userId)).data.data;

        dispatch({
            type: accountActionTypes.USER_LOAD_END,
            payload: {
                user: user
            }
        });
    } catch (e) {
        dispatch(change('accountEditForm', 'errorMessages', [e.response.data.message]));
        
        dispatch({
            type: accountActionTypes.USER_LOAD_ERROR
        });
    }
};