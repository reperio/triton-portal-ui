import {Dispatch} from "react-redux";
import { imageService } from "../services/imageService";
import { change } from 'redux-form';

export const imageActionTypes = {
    IMAGES_GET_START: "IMAGES_GET_START",
    IMAGES_GET_END: "IMAGES_GET_END",
    IMAGES_ERROR: "IMAGES_ERROR",
    PACKAGES_SELECT: "PACKAGES_SELECT"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getAllImages = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: imageActionTypes.IMAGES_GET_START,
        payload: {
            images:[]
        }
    });
    
    try {
        const images = await imageService.getImages();
        dispatch({
            type: imageActionTypes.IMAGES_GET_END,
            payload: {
                images: images.data.data
            }
        });
    } catch (e) {
        dispatch(change('virtualMachineForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));

        dispatch({
            type: imageActionTypes.IMAGES_ERROR
        });
    }
};