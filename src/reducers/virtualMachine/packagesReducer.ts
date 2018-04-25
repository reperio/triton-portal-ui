import {initialState, StatePackages} from "../../store/initialState";
import { packagesActionTypes } from "../../actions/packagesActions";

export function packagesReducer(state = initialState.packages, action: {type: string, payload: any}): StatePackages {
    switch (action.type) {
        case packagesActionTypes.PACKAGES_GET_START: {
            return {
                hasLoaded: false,
                packages: [],
                errorMessages: [],
                showInformation: false,
                selectedPackage: null
            };
        }
        case packagesActionTypes.PACKAGES_GET_END: {
            return {
                hasLoaded: true,
                packages: action.payload.packages,
                errorMessages: [],
                showInformation: false,
                selectedPackage: null
            };
        }
        case packagesActionTypes.PACKAGES_ERROR: {
            return {
                hasLoaded: false,
                packages: [],
                errorMessages: [action.payload.message],
                showInformation: false,
                selectedPackage: null
            };
        }
        case packagesActionTypes.PACKAGES_SELECT: {
            return {
                hasLoaded: true,
                packages: action.payload.packages,
                errorMessages: [],
                showInformation: true,
                selectedPackage: action.payload.selectedPackage
            };
        }
        default: {
            return state;
        }
    }
}