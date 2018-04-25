import { axios } from "./axiosService";
import EditAccountModel from "../models/editAccountModel";

class UserService {
    async getUserById(userId: string) {
        return await axios.get(`/users/${userId}`);
    }

    async createUser(username: string, password: string, firstName: string, lastName: string, email: string, ownerUuid: string) {
        const payload = {
            user: {
                username, 
                password, 
                firstName, 
                lastName, 
                email,
                ownerUuid
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

    async createSshKey(userId: number, ssh: any) {
        const payload = {
            sshKey: {
                key: ssh.key, 
                description: ssh.description
            }
        };
        return await axios.post(`/users/${userId}/sshKeys`, payload);
    }

    async deleteSshKey(userId: number, sshKeyId: number) {
        const payload = {
            user: {
                userId, 
                sshKeyId
            }
        };
        return await axios.post(`/users/${userId}/sshKeys`, payload);
    }

    async getSshKeysByUser(userId: number) {
        return await axios.get(`/users/${userId}/sshKeys`);
    }
}

export const userService = new UserService();