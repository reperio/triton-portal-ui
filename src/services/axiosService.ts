import axiosStatic from "axios";
import * as authActions from "../actions/authActions"
import { store } from "../store/store";
import { authService } from "../services/authService";

declare const API_URL: string;

export const axios = axiosStatic.create({baseURL: API_URL});

axios.interceptors.request.use(async config => {
    const authToken = authActions.getAuthToken();
    const currentState = store.getState();
    if (authToken != null) {
        const parsedToken = authService.parseJwt(authToken);
        const hasTokenTimeExpired = authService.hasTokenTimeExpired(parsedToken)
        if (hasTokenTimeExpired) {
            authActions.logout()((store.dispatch));
        }
        else {
            config.headers.authorization = `Bearer ${authToken}`;
        }
    }
    else {
        if (!currentState.authSession.isLoading) {
            authActions.logout()(store.dispatch);
        }
    }
    return config;
});

axios.interceptors.response.use(async response => {
    if (response.headers != null && response.headers.authorization != null && response.headers.authorization.slice(0, 6) === "Bearer") {
        const authToken = response.headers.authorization.slice(7);
        const currentState = store.getState();
        await authActions.setAuthToken(authToken, true)(store.dispatch);
    }
    return response;
});