import { axios } from "./axiosService";

class PackageService {
    async getPackages() {
        return await axios.get(`/triton/packages`);
    }

    async getPackageByUuid(uuid: string) {
        return await axios.get(`/triton/packages/${uuid}`);
    }
}

export const packageService = new PackageService();