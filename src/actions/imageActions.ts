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
    IMAGES_SELECT: "IMAGES_SELECT"
};

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
        dispatch(change(formName, 'errorMessages', [e.response.data.message]));

        dispatch({
            type: imageActionTypes.IMAGES_ERROR
        });
    }
};

export const getImageByUuid = (image_uuid: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: imageActionTypes.IMAGE_GET_START
    });
    
    try {
        dispatch(change('virtualMachineForm', 'image', null));
        
        const image = (await imageService.getImageByUuid(image_uuid)).data.data;

        dispatch(change('virtualMachineForm', 'image', image));

        dispatch({
            type: imageActionTypes.IMAGE_GET_END
        });
    } catch (e) {
        dispatch(change('imageInformationModal', 'errorMessages', [e.response.data.message]));

        dispatch({
            type: imageActionTypes.IMAGES_ERROR
        });
    }
};

export const hideImageInformation = () => (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'showingImageInformationModal', false));
}

export const showImageInformation = (row: any) => (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'row', row));
    dispatch(change('virtualMachineForm', 'showingImageInformationModal', true));
}

export const selectImage = (formName: string, uuid: string, images: any) => (dispatch: Dispatch<any>) => {
    const image = images.filter((image:any) => {
        if (image.uuid === uuid) {
            return image;
        }
    });

    if (image.length === 1) {
        dispatch({
            type: imageActionTypes.IMAGES_SELECT,
            payload: {
                selectedImage: image[0]
            }
        });
        dispatch(change('virtualMachineProvisionModal', 'brand', null));
    }
}