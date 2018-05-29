import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { FormGroup} from "react-bootstrap";
import { DropdownList } from 'react-widgets'
import Error from '../misc/error';

const VirtualMachineReprovisionModal = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <FormGroup className="modal-window">
            <label>Select an image</label>
            <Field  className="form-control"
                    name='image'
                    onChange={props.selectImage}
                    component="select">
                    <option>-- Select an image --</option>
                    {
                        props.initialValues.images.map((images:any, i:number) => <option key={i} value={images.uuid}>{images.name}</option>)
                    }
            </Field>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineReprovisionModal' })(VirtualMachineReprovisionModal) as any;