import { axios } from "./axiosService";
import UserModel from "../models/userModel";

class UserService {
    async getUserById(userId: string) {
        return await axios.get(`/users/${userId}`);
    }

    async createUser(account: UserModel) {
        const payload = {
            user: {
                username: account.username, 
                password: account.password, 
                firstName: account.firstName, 
                lastName: account.lastName, 
                email: account.email,
                ownerUuid: account.ownerUuid
            }
        };
        return await axios.post(`/users`, payload);
    }

    async updateUser(userId: string, user: UserModel) {
        const payload = {
            email: user.email,
            currentPassword: user.password,
            username: user.username,
            newPassword: user.newPassword,
            firstName: user.firstName,
            lastName: user.lastName,
            sshKeys: user.sshKeys
        };
        return await axios.put(`/users/${userId}`, {user: payload});
    }
}

export const userService = new UserService();