import { axios } from "./axiosService";

class UserService {
    async getUserById(userId: number) {
        return await axios.get(`/users/${userId}`);
    }

    async createUser(username: string, password: string, firstName: string, lastName: string, email: string) {
        const payload = {
            user: {
                username, 
                password, 
                firstName, 
                lastName, 
                email
            }
        };
        return await axios.post(`/users`, payload);
    }
}

export const userService = new UserService();