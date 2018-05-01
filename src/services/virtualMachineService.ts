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
            virtualMachine: {
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

    async editVm(id: string, billing_id: string) {
        return await axios.put(`/triton/vms/${id}/update?billing_id=${billing_id}`);
    }

    async startVm(owner_uuid: string, id: string) {
        return await axios.put(`triton/vms/${id}/start?owner_id=${owner_uuid}`);
    }

    async stopVm(owner_uuid: string, id: string) {
        return await axios.put(`triton/vms/${id}/stop?owner_id=${owner_uuid}`);
    }

    async rebootVm(owner_uuid: string, id: string) {
        return await axios.put(`triton/vms/${id}/reboot?owner_id=${owner_uuid}`);
    }

    async deleteVm(owner_uuid: string, id: string) {
        return await axios.delete(`triton/vms/${id}?owner_id=${owner_uuid}`);
    }
}

export const virtualMachineService = new VirtualMachineService();