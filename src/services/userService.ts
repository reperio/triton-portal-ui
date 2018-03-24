import { axios } from "./axiosService";

class UserService {
    async getUserById(userId: number) {
        return await axios.get(`/users/${userId}`);
    }

    async createUser(username: string, password: string, firstName: string, lastName: string, email: string) {
        return await axios.post(`/users`, {username, password, firstName, lastName, email});
    }
}

export const userService = new UserService();