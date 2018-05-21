import { Dispatch } from "react-redux";
import { change } from 'redux-form';

export const locationChange = (location: string) => async (dispatch: Dispatch<any>) => {
    dispatch(change('navMenu', 'location', location));
};