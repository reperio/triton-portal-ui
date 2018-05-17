import { axios } from "./axiosService";
import CreateNetworkModel from '../models/createNetworkModel';

class NetworkService {
    async getFabricNetworksByOwnerAndVLanId(ownerId: string, vlanId: string) {
        return await axios.get(`/triton/fabrics/${ownerId}/vlans/${vlanId}/networks`);
    }

    async getFabricLansByOwnerId(ownerId: string) {
        return await axios.get(`/triton/fabrics/${ownerId}/vlans`);
    }

    async createFabricNetwork(network: CreateNetworkModel, ownerUuid: string, vlandId: number) {
        const payload = {
            name: network.name,
            subnet: network.subnet,
            provision_start_ip: network.provisionStartIp,
            provision_end_ip: network.provisionEndIp,
            gateway: network.gateway,
            resolvers: network.resolvers,
            description: network.description
        };
        return await axios.post(`/triton/fabrics/${ownerUuid}/vlans/${vlandId}/networks`, {fabricNetwork: payload});
    }

    async createFabricVlan(name: string, ownerUuid: string, description: string) {
        const payload = {
            name: name,
            description: description
        };
        return await axios.post(`/triton/fabrics/${ownerUuid}/vlans`, {fabricVLan: payload});
    }

    async deleteFabricNetwork(ownerUuid: string, vlanId: number, networkUuid: string) {
        return await axios.delete(`/triton/fabrics/${ownerUuid}/vlans/${vlanId}/networks/${networkUuid}`);
    }

    async deleteFabricVlan(ownerUuid: string, vlanId: number) {
        return await axios.delete(`/triton/fabrics/${ownerUuid}/vlans/${vlanId}/`);
    }
}

export const networkService = new NetworkService();