import {initialState, StatePackages, StateImages} from "../../store/initialState";
import { imageActionTypes } from "../../actions/imageActions";

export function imageReducer(state = initialState.images, action: {type: string, payload: any}): StateImages {
    switch (action.type) {
        case imageActionTypes.IMAGES_GET_START: {
            return {
                isLoading: true,
                images: []
            };
        }
        case imageActionTypes.IMAGES_GET_END: {
            return {
                isLoading: false,
                images: action.payload.images
            };
        }
        case imageActionTypes.IMAGES_ERROR: {
            return {
                isLoading: false,
                images: []
            };
        }
        default: {
            return state;
        }
    }
}