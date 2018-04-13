import { axios } from "./axiosService";

class NetworkService {
    async getNetworksByOwner(ownerId: string) {
        return await axios.get(`/triton/networks/${ownerId}`);
    }
}

export const networkService = new NetworkService();