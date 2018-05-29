import sshKeyModel from '../models/sshKeyModel';

export default class UserModel {
    createdAt: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    ownerUuid: string;
    password: string;
    newPassword: string;
    confirmNewPassword: string;
    sshKeys: sshKeyModel[];
    updatedAt: string;
    username: string;
}