import { axios } from "./axiosService";
import FirewallRuleModel from "../models/firewallRuleModel";

class FirewallService {
    async getRulesByUuid(uuid: string) {
        return await axios.get(`/triton/firewall/${uuid}`);
    }

    async editFirewallRules(firewallRules: FirewallRuleModel[], vm_uuid: string) {
        return await axios.post(`triton/firewall/${vm_uuid}`, {firewallRules});
    }
}

export const firewallService = new FirewallService();