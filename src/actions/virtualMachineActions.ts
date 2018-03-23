import {Dispatch} from "react-redux";

import { virtualMachineService } from "../services/virtualMachineService";
import { userService } from "../services/userService";

export const authActionTypes = {
    VIRTUAL_MACHINES_GET_ALL_START: "VIRTUAL_MACHINES_GET_ALL_START",
    VIRTUAL_MACHINES_GET_ALL_END: "VIRTUAL_MACHINES_GET_ALL_END",
    VIRTUAL_MACHINES_GET_ALL_ERROR: "VIRTUAL_MACHINES_GET_ALL_ERROR"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getAllVms = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.VIRTUAL_MACHINES_GET_ALL_START,
        payload: {
            vms: [],
            isLoading: true
        }
    });
    try {
        const vms = await virtualMachineService.getAll();

        dispatch({
            type: authActionTypes.VIRTUAL_MACHINES_GET_ALL_END,
            payload: {
                vms: vms.data.data,
                isLoading: false
            }
        });
    } catch (e) {
        dispatch({
            type: authActionTypes.VIRTUAL_MACHINES_GET_ALL_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};
