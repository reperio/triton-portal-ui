import { axios } from "./axiosService";

class VirtualMachineService {
    async getVmByUuid(uuid: string) {
        return await axios.get(`/triton/vms/${uuid}`);
    }

    async getAll() {
        return await axios.get(`/triton/vms`);
    }
}

export const virtualMachineService = new VirtualMachineService();