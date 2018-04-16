export default class CreateNetworkModel {
    name: string;
    description: string;
    gateway: string;
    nicTag: string;
    provisionEndIp: string;
    provisionStartIp: string;
    resolvers: string[];
    subnet: string;
    vlanId: number;
}