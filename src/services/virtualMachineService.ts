import { axios } from "./axiosService";

class VirtualMachineService {
    async getVmByUuid(uuid: string) {
        return await axios.get(`/triton/vms/${uuid}`);
    }

    async getAll() {
        return await axios.get(`/triton/vms`);
    }

    async getVmsByOwnerUuid(owner_uuid: string) {
        return await axios.get(`/triton/vms/owner/${owner_uuid}`);
    }
    
    async createVm(owner_uuid: string, alias: string, networks: any[], brand: string, billing_id: string, image_uuid: string) {
        const payload = {
            user: {
                owner_uuid,
                alias,
                networks, 
                brand, 
                billing_id, 
                image_uuid
            }
        };
        return await axios.post(`/triton/vms`, payload);
    }
}

export const virtualMachineService = new VirtualMachineService();