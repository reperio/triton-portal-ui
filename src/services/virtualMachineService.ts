import { axios } from "./axiosService";
import nic from "../models/nicModel";

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
    
    async createVm(owner_uuid: string, alias: string, networks: any[], brand: string, billing_id: string, image_uuid: string, quota: number) {

        let newNetworksObject: nic[] = [];

        networks.map(network => {
            newNetworksObject.push({
                primary: network.primary,
                ipv4_uuid: network.network_uuid
            });
        });

        const payload = {
            virtualMachine: {
                owner_uuid,
                alias,
                networks: newNetworksObject,
                brand, 
                billing_id, 
                image_uuid,
                quota
            }
        };
        return await axios.post(`/triton/vms`, payload);
    }

    async reprovisionVm(id: string, image_uuid: string) {
        const payload = {
            virtualMachine: {
                image_uuid
            }
        };
        return await axios.put(`/triton/vms/${id}/reprovision`, payload);
    }

    async renameVm(id: string, alias: string) {
        const payload = {
            virtualMachine: {
                alias
            }
        };
        return await axios.put(`/triton/vms/${id}/rename`, payload);
    }

    async resizeVm(id: string, billing_id: string) {
        const payload = {
            virtualMachine: {
                billing_id
            }
        };
        return await axios.put(`/triton/vms/${id}/resize`, payload);
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

    async editNics(nics: any[], id: string) {
        return await axios.post(`triton/vms/${id}/nics`, {nics});
    }
}

export const virtualMachineService = new VirtualMachineService();