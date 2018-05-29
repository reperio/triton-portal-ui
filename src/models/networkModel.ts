export default class NetworkModel {
    fabric: boolean;
    family: string;
    gateway: string;
    gateway_provisioned: boolean;
    internet_nat: boolean;
    mtu: number;
    name: string;
    netmask: string;
    nic_tag: string;
    owner_uuid: string;
    provision_end_ip: string;
    provision_start_ip: string;
    resolvers: string[];
    subnet: string;
    uuid: string;
    vlan_id: number;
    vnet_id: number;
    description: string;
}