import axiosStatic from "axios";
import * as authActions from "../actions/authActions"
import { store } from "../store/store";
import { authService } from "../services/authService";

declare const API_URL: string;

export const axios = axiosStatic.create({baseURL: API_URL});

axios.interceptors.request.use(async config => {
    const authToken = authService.readToken();
    if (authToken != null) {
            config.headers.authorization = `Bearer ${authToken}`;
    }
    return config;
});

axios.interceptors.response.use(async response => {
    if (response.headers != null && response.headers.authorization != null && response.headers.authorization.slice(0, 6) === "Bearer") {
        const authToken = response.headers.authorization.slice(7);
        await authActions.setAuthToken(authToken)(store.dispatch);
    }
    return response;
});