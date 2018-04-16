import { axios } from "./axiosService";
import CreateNetworkModel from '../models/createNetworkModel';

class NetworkService {
    async getNetworksByOwner(ownerId: string) {
        return await axios.get(`/triton/networks/${ownerId}`);
    }

    async createNetwork(network: CreateNetworkModel) {
        return await axios.post(`/triton/networks`);
    }
}

export const networkService = new NetworkService();