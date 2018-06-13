import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { FormGroup } from "react-bootstrap";
import Error from '../misc/error';

const VirtualMachineRenameModal = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <FormGroup>
            <label>Alias</label>
            <Field  name="alias"
                    component="input" 
                    className="reperio-form-control reperio-text-input"
                    type="text" 
                    placeholder="Virtual Machine Name" />
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineRenameModal' })(VirtualMachineRenameModal) as any;