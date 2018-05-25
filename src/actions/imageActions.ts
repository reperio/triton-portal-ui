import {Dispatch} from "react-redux";
import { imageService } from "../services/imageService";
import { change } from 'redux-form';

export const imageActionTypes = {
    IMAGES_GET_START: "IMAGES_GET_START",
    IMAGES_GET_END: "IMAGES_GET_END",
    IMAGES_ERROR: "IMAGES_ERROR",
    IMAGE_GET_START: "IMAGE_GET_START",
    IMAGE_GET_END: "IMAGE_GET_END",
    IMAGE_ERROR: "IMAGE_ERROR",
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getAllImages = (formName: string) => async (dispatch: Dispatch<any>) => {
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
        dispatch(change(formName, 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));

        dispatch({
            type: imageActionTypes.IMAGES_ERROR
        });
    }
};

//getImageByUuid

export const getImageByUuid = (image_uuid: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: imageActionTypes.IMAGE_GET_START
    });
    
    try {
        const image = (await imageService.getImageByUuid(image_uuid)).data.data;

        dispatch(change('virtualMachineForm', 'imageName', image.name));

        dispatch({
            type: imageActionTypes.IMAGE_GET_END
        });
    } catch (e) {
        dispatch(change('virtualMachineForm', 'errorMessages', [getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)]));

        dispatch({
            type: imageActionTypes.IMAGES_ERROR
        });
    }
};