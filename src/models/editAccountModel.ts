import sshKeyModel from '../models/sshKeyModel';

export default class EditAccountModel {
    email: string;
    currentPassword: string;
    newPassword: string;
    username: string;
    firstName: string;
    lastName: string;
    confirmNewPassword: string;
    sshKeys: sshKeyModel[];
}