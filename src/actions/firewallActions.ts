import { Dispatch } from "react-redux";
import { change } from 'redux-form';
import { firewallService } from "../services/firewallService";
import { inputValidationService } from '../services/inputValidationService';
import FirewallRuleModel from "../models/firewallRuleModel";
import FirewallRuleFormattedModel from "../models/firewallRuleFormattedModel";
var Joi = require('joi-browser');

export const firewallActionTypes = {
    RULES_GET_START: "RULES_GET_START",
    RULES_GET_END: "RULES_GET_END",
    RULES_ERROR: "RULES_ERROR",
    FIREWALL_EDIT_RULES_START: "FIREWALL_EDIT_RULES_START",
    FIREWALL_EDIT_RULES_END: "FIREWALL_EDIT_RULES_END",
    FIREWALL_EDIT_RULES_ERROR: "FIREWALL_EDIT_RULES_ERROR"
};

export const getRulesByVmUuid = (uuid: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: firewallActionTypes.RULES_GET_START
    });
    
    try {
        const rules : FirewallRuleModel[] = (await firewallService.getRulesByUuid(uuid)).data.data;

        const formattedRules = rules.map((rule: FirewallRuleModel) => {
            const from = rule.rule.split('FROM')[1].split('TO')[0].trim();

            let allow = 'ALLOW';
            if (rule.rule.includes('BLOCK')) {
                allow = 'BLOCK';
            }

            const to = rule.rule.split('TO')[1].split(allow)[0].trim();
            const action = rule.rule.split(allow)[1].trim();

            const formattedRule : FirewallRuleFormattedModel = {
                from,
                to, 
                allow,
                actionPredicate: action,
                enabled: rule.enabled,
                global: rule.global,
                uuid: rule.uuid,
                version: rule.version,
                description: rule.description
            };

            return formattedRule;
        });

        dispatch(change('virtualMachineEditFirewallRulesModal', 'firewallRules', formattedRules));

        dispatch({
            type: firewallActionTypes.RULES_GET_END
        });

    } catch (e) {
        dispatch({
            type: firewallActionTypes.RULES_ERROR
        });

        dispatch(change('virtualMachineEditFirewallRulesModal', 'errorMessages', [e.response.data.message]));
    }
};

export const hideFirewallRulesModal = () => (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'showingFirewallRulesModal', false));
}

export const showFirewallRulesModal = (row: any) => (dispatch: Dispatch<any>) => {
    dispatch(change('virtualMachineForm', 'row', row));
    dispatch(change('virtualMachineForm', 'showingFirewallRulesModal', true));
}

export const editFirewallRules = (rules: FirewallRuleFormattedModel[], owner_uuid: string, vm_uuid: string) => async (dispatch: Dispatch<any>) => {

    rules = rules.filter((rule: FirewallRuleFormattedModel) => !rule.global);
    const schemaRules = rules.map((rule: FirewallRuleFormattedModel) => {
        const schemaRule : any = {
            enabled: rule.enabled != null ? rule.enabled : false,
            from: rule.from,
            to: rule.to,
            actionPredicate: rule.actionPredicate,
            allow: rule.allow,
            owner_uuid
        }
        
        return schemaRule;
    });

    const schema = Joi.object().keys({
        schemaRules: Joi.array().items(
            Joi.object({
                enabled: Joi.boolean().required(),
                from: Joi.string().required(),
                to: Joi.string().required(),
                actionPredicate: Joi.string().required(),
                allow: Joi.string().required(),
                owner_uuid: Joi.string().guid().required()
            })
        ).optional(),
    }).options({ abortEarly: false });

    let errors = await inputValidationService.validate({
        schemaRules}, schema);

    dispatch(change('virtualMachineEditFirewallRulesModal', 'errorMessages', errors));

    if (errors.length == 0) {

        const newRules: any[] = rules
        .map((rule: FirewallRuleFormattedModel) => {
            const newRule : any = {
                enabled: rule.enabled != null ? rule.enabled : false,
                rule: `FROM ${rule.from.trim().toLowerCase()} TO ${rule.to.trim().toLowerCase()} ${rule.allow} ${rule.actionPredicate.trim().toLowerCase()}`,
                uuid: rule.uuid != null ? rule.uuid : '',
                owner_uuid
            }
            
            return newRule;
        });

        try {
            dispatch({ type: firewallActionTypes.FIREWALL_EDIT_RULES_START });

            await firewallService.editFirewallRules(newRules, vm_uuid);

            hideFirewallRulesModal()(dispatch);
            
            dispatch({ type: firewallActionTypes.FIREWALL_EDIT_RULES_END });
        } catch(e) {
            dispatch(change('virtualMachineEditFirewallRulesModal', 'errorMessages', [e.response.data.message]));

            dispatch({ type: firewallActionTypes.FIREWALL_EDIT_RULES_ERROR });
        }
    }
}