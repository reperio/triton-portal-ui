import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { FormGroup} from "react-bootstrap";
import { DropdownList } from 'react-widgets';
import Error from '../misc/error';

const VirtualMachineResizeModal = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <FormGroup className="modal-window">
            <label>Resize this Virtual Machines to package</label>
            <DropdownList   defaultValue={props.initialValues.billing_id}
                            name="package"
                            valueField="uuid" 
                            textField="name"
                            data={props.initialValues.packages}
                            onSelect={props.selectPackage}
                            placeholder="Select a package" />
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineResizeModal' })(VirtualMachineResizeModal) as any;