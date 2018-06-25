import React from 'react';
import { reduxForm, FieldArray } from 'redux-form'
import { FormGroup } from "react-bootstrap";
import  { FirewallFieldArrayComponent } from './firewallFieldArrayComponent';
import Error from '../../components/misc/error';

const VirtualMachineEditFirewallRulesModal = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
    {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <FormGroup>
            <FieldArray name="firewallRules"
                        //selectNetworks={props.selectNetworks} 
                        //selectPrimaryNic={props.selectPrimaryNic} 
                        firewallRules={props.initialValues.firewallRules} 
                        //networks={props.networks.networks} 
                        component={FirewallFieldArrayComponent}/>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineEditFirewallRulesModal' })(VirtualMachineEditFirewallRulesModal) as any;

