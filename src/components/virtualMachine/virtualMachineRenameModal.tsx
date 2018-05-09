import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { FlatButton } from 'material-ui';

const VirtualMachineRenameModal = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <FormGroup>
            <label>Rename Virtual Machine alias</label>
            <Field name="alias" component="input" className="form-control" type="text" placeholder="Virtual Machine Name" />
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineRenameModal' })(VirtualMachineRenameModal) as any;