import { axios } from "./axiosService";

class PackageService {
    async getPackages() {
        return await axios.get(`/triton/packages`);
    }
}

export const packageService = new PackageService();