import { axios } from "./axiosService";
import * as authActions from "../actions/authActions";
import { store } from "../store/store";

class AuthService {
    async login(email: string, password: string) {
        const body = {
            email: email,
            password: password
        };
        return await axios.post(`/auth`, body);
    }

    async logout() {
        authActions.logout()(store.dispatch);
    }

    async getIsLoggedIn() {
        return await axios.get(`/auth`);
    }

    parseJwt(token: string): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse(window.atob(base64));
    }

    getTokenExpirationDate() {
        const token = this.readToken();
        if (token === null) {
            return null;
        }
        return this.parseJwt(token).exp;
    }

    readToken() {
        return window.localStorage.getItem("authToken");
    }

    hasTokenExpired(exp: any): boolean {
        const time = Math.round((new Date()).getTime() / 1000);
        if (time < exp) {
            return false;
        }
        return true;
    }
}

export const authService = new AuthService();