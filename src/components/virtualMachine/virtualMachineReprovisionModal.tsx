import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { FormGroup} from "react-bootstrap";
import { FlatButton } from 'material-ui';
import { DropdownList } from 'react-widgets'

const VirtualMachineReprovisionModal = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <FormGroup className="modal-window">
            <label>Select an image</label>
            <DropdownList 
                defaultValue={props.initialValues.image_uuid}
                name="image"
                valueField="uuid" 
                textField="name"
                data={props.initialValues.images}
                onSelect={props.selectImage}
                placeholder="Select an image" />
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineReprovisionModal' })(VirtualMachineReprovisionModal) as any;