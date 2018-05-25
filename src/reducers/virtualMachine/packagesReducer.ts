import {initialState, StatePackages} from "../../store/initialState";
import { packagesActionTypes } from "../../actions/packagesActions";

export function packagesReducer(state = initialState.packages, action: {type: string, payload: any}): StatePackages {
    switch (action.type) {
        case packagesActionTypes.PACKAGES_GET_START: {
            return {
                isLoading: true,
                packages: [],
                showInformation: false,
                selectedPackage: null
            };
        }
        case packagesActionTypes.PACKAGES_GET_END: {
            return {
                isLoading: false,
                packages: action.payload.packages,
                showInformation: false,
                selectedPackage: null
            };
        }
        case packagesActionTypes.PACKAGES_ERROR: {
            return {
                isLoading: false,
                packages: [],
                showInformation: false,
                selectedPackage: null
            };
        }
        case packagesActionTypes.PACKAGES_SELECT: {
            return Object.assign({}, state, {selectedPackage: action.payload.selectedPackage, showInformation: true});
        }
        default: {
            return state;
        }
    }
}