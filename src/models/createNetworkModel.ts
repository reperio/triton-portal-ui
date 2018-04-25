export default class CreateNetworkModel {
    name: string;
    description: string;
    gateway: string;
    provisionEndIp: string;
    provisionStartIp: string;
    resolvers: string[];
    subnet: string;
    internetNat: string;
}