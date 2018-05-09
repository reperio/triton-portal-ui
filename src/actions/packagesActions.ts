import {Dispatch} from "react-redux";
import { packageService } from "../services/packageService";
import { change } from 'redux-form';

export const packagesActionTypes = {
    PACKAGES_GET_START: "PACKAGES_GET_START",
    PACKAGES_GET_END: "PACKAGES_GET_END",
    PACKAGES_ERROR: "PACKAGES_ERROR",
    PACKAGES_SELECT: "PACKAGES_SELECT"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getAllPackages = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: packagesActionTypes.PACKAGES_GET_START,
        payload: {
            packages:[]
        }
    });
    
    try {
        const packages = await packageService.getPackages();
        dispatch({
            type: packagesActionTypes.PACKAGES_GET_END,
            payload: {
                packages: packages.data.data
            }
        });
    } catch (e) {
        dispatch({
            type: packagesActionTypes.PACKAGES_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const showPackageInformation = (packages: any[], selectedPackage: any) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: packagesActionTypes.PACKAGES_SELECT,
        payload: {
            packages,
            selectedPackage
        }
    });
};