import { axios } from "./axiosService";
import EditAccountModel from "../models/editAccountModel";
import CreateAccountModel from "../models/createAccountModel";

class UserService {
    async getUserById(userId: string) {
        return await axios.get(`/users/${userId}`);
    }

    async createUser(account: CreateAccountModel) {
        const payload = {
            user: {
                username: account.username, 
                password: account.password, 
                firstName: account.firstname, 
                lastName: account.lastname, 
                email: account.email,
                ownerUuid: account.ownerId
            }
        };
        return await axios.post(`/users`, payload);
    }

    async updateUser(userId: string, user: EditAccountModel) {
        const payload = {
            email: user.email,
            currentPassword: user.currentPassword,
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