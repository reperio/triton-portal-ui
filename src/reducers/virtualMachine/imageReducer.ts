import {initialState, StatePackages, StateImages} from "../../store/initialState";
import { imageActionTypes } from "../../actions/imageActions";

export function imageReducer(state = initialState.images, action: {type: string, payload: any}): StateImages {
    switch (action.type) {
        case imageActionTypes.IMAGES_GET_START: {
            return {
                hasLoaded: false,
                images: [],
                selectedImage: null
            };
        }
        case imageActionTypes.IMAGES_GET_END: {
            return {
                hasLoaded: true,
                images: action.payload.images,
                selectedImage: null
            };
        }
        case imageActionTypes.IMAGES_ERROR: {
            return {
                hasLoaded: false,
                images: [],
                selectedImage: null
            };
        }
        default: {
            return state;
        }
    }
}