import { axios } from "./axiosService";

class AuthService {
    async login(email: string, password: string) {
        const body = {
            email: email,
            password: password
        };
        return await axios.post(`/auth`, body);
    }

    parseJwt(token: string): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse(window.atob(base64));
    }
}

export const authService = new AuthService();