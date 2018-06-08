import React from 'react';
import { reduxForm, FieldArray } from 'redux-form'
import { FormGroup } from "react-bootstrap";
import  { NicFieldArrayComponent } from '../network/nicFieldArrayComponent';
import Error from '../../components/misc/error';

const VirtualMachineEditNicsModal = (props: any) => (
    <form className="modal-container" onSubmit={props.handleSubmit(props.onSubmit)}>
    {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <FormGroup>
            <label>Edit Nics</label>
            <FieldArray name="nics"
                        selectNetworks={props.selectNetworks} 
                        selectPrimaryNic={props.selectPrimaryNic} 
                        nics={props.nics} 
                        networks={props.networks.networks} 
                        component={NicFieldArrayComponent}/>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineEditNicsModal' })(VirtualMachineEditNicsModal) as any;