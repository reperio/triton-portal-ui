import {Dispatch} from "react-redux";
import { packageService } from "../services/packageService";
import { change } from 'redux-form';
import PackageModel from "../models/packageModel";

export const packagesActionTypes = {
    PACKAGES_GET_START: "PACKAGES_GET_START",
    PACKAGES_GET_END: "PACKAGES_GET_END",
    PACKAGES_ERROR: "PACKAGES_ERROR",
    PACKAGES_SELECT: "PACKAGES_SELECT",
    PACKAGE_GET_START: "PACKAGE_GET_START",
    PACKAGE_GET_END: "PACKAGE_GET_END",
    PACKAGE_ERROR: "PACKAGE_ERROR"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getAllPackages = (formName: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: packagesActionTypes.PACKAGES_GET_START,
        payload: {
            packages:[]
        }
    });
    
    try {
        const packages: PackageModel[] = (await packageService.getPackages()).data.data;
        dispatch({
            type: packagesActionTypes.PACKAGES_GET_END,
            payload: {
                packages: packages
            }
        });
    } catch (e) {
        dispatch({
            type: packagesActionTypes.PACKAGES_ERROR
        });

        dispatch(change(formName, 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));
    }
};

export const getPackageByUuid = (uuid: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: packagesActionTypes.PACKAGE_GET_START
    });
    
    try {
        dispatch(change('virtualMachineForm', 'package', null));

        const _package : PackageModel = (await packageService.getPackageByUuid(uuid)).data.data;
        dispatch({
            type: packagesActionTypes.PACKAGE_GET_END
        });

        dispatch(change('virtualMachineForm', 'package', _package));
    } catch (e) {
        dispatch({
            type: packagesActionTypes.PACKAGE_ERROR
        });

        dispatch(change('packageInformation', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));
    }
};

//getPackageByUuid

export const showPackageInformation = (uuid: string, packages: any[]) => async (dispatch: Dispatch<any>) => {
    const _package = packages.filter((_package:any) => {
        if (_package.uuid === uuid) {
            return _package;
        }
    });

    if (_package.length === 1) {
        dispatch({
            type: packagesActionTypes.PACKAGES_SELECT,
            payload: {
                selectedPackage: _package[0]
            }
        });
    }
};

export const hidePackageInformation = () => (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'showingPackageInformationModal', false));
}

export const showPackageInformationModal = (row: any) => (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'row', row));
    dispatch(change('virtualMachineForm', 'showingPackageInformationModal', true));
}