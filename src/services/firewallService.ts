import { axios } from "./axiosService";
import FirewallRuleModel from "../models/firewallRuleModel";
import FirewallRuleFormattedModel from "../models/firewallRuleFormattedModel";

class FirewallService {
    async getRulesByUuid(uuid: string) {
        return await axios.get(`/triton/firewall/${uuid}`);
    }

    async editFirewallRules(firewallRules: FirewallRuleModel[], vm_uuid: string) {
        return await axios.post(`triton/firewall/${vm_uuid}`, {firewallRules});
    }

    // validateRuleStructure (rules: FirewallRuleFormattedModel[]) : any[] {
    //     const targetTypes = ['vm', 'ip', 'subnet', 'tag', 'any'];
    //     const protocoTypes = ['tcp', 'udp', 'icmp', 'icmp6', 'ah', 'esp'];

    //     const invalid: string[] = [];

    //     for (let index = 0; index < rules.length; index++) {
    //         const targetTypeFrom = rules[index].from.split(' ');
    //         const targetTypeTo = rules[index].to.split(' ');
    //         const protocoTypePredicate = rules[index].actionPredicate.split(' ');
    //         let validFrom = false;
    //         let validTo = false;
    //         let validPredicate = false;

    //         if (targetTypeFrom[0] === 'all' && targetTypeFrom[1] === 'vms') {
    //             validFrom = true;
    //         }
    //         else if (targetTypes.includes(targetTypeFrom[0])) {
    //             validFrom = true;
    //         }
    //         else if (rules[index].from.charAt(0) === '(' && rules[index].from.charAt(rules[index].from.length-1) === ')') {
    //             //target-list
    //             const newFrom = rules[index].from.substring(1, rules[index].from.length-1)
    //                 .split('OR')
    //                 .map((item: string) => {
    //                     return item.trim();
    //                 });
                    
    //             newFrom.forEach((item: string) => {
    //                 if (targetTypes.includes(item.split(' ')[0])) {
    //                     validFrom = true;
    //                 }
    //             });
    //         }

    //         if (targetTypeTo[0] === 'all' && targetTypeTo[1] === 'vms') {
    //             validTo = true;
    //         }
    //         else if (targetTypes.includes(targetTypeTo[0])) {
    //             validTo = true;
    //         }
    //         else if (rules[index].to.charAt(0) === '(' && rules[index].to.charAt(rules[index].to.length-1) === ')') {
    //             //target-list
    //             const newTo = rules[index].to.substring(1, rules[index].to.length-1)
    //                 .split('OR')
    //                 .map((item: string) => {
    //                     return item.trim();
    //                 });
                    
    //             newTo.forEach((item: string) => {
    //                 if (targetTypes.includes(item.split(' ')[0])) {
    //                     validTo = true;
    //                 }
    //             });
    //         }

    //         if (protocoTypePredicate[0] === 'all' && protocoTypePredicate[1] === 'vms') {
    //             validTo = true;
    //         }
    //         else if (targetTypes.includes(targetTypeTo[0])) {
    //             validTo = true;
    //         }
    //         else if (rules[index].to.charAt(0) === '(' && rules[index].to.charAt(rules[index].to.length-1) === ')') {
    //             //target-list
    //             const newTo = rules[index].to.substring(1, rules[index].to.length-1)
    //                 .split('OR')
    //                 .map((item: string) => {
    //                     return item.trim();
    //                 });
                    
    //             newTo.forEach((item: string) => {
    //                 if (targetTypes.includes(item.split(' ')[0])) {
    //                     validTo = true;
    //                 }
    //             });
    //         }
    //     }

    //     return invalid;
    // }
}

export const firewallService = new FirewallService();