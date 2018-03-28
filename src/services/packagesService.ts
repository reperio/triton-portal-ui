import { axios } from "./axiosService";

class PackagesService {
    async getPackages() {
        return await axios.get(`/triton/packages`);
    }
}

export const packagesService = new PackagesService();