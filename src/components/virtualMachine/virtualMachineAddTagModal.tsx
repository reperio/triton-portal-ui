import React from 'react';
import { reduxForm, Field } from 'redux-form'
import { FormGroup } from "react-bootstrap";
import Error from '../../components/misc/error';

const VirtualMachineAddTagModal = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <FormGroup>
            <Field  name={`name`}
                    component="input" 
                    className="reperio-form-control reperio-text-input"
                    type="text" 
                    placeholder="Name" />
        </FormGroup>
        <FormGroup>
            <Field  name={`value`}
                    component="input" 
                    className="reperio-form-control reperio-text-input"
                    type="text" 
                    placeholder="Value" />
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineAddTagModal' })(VirtualMachineAddTagModal) as any;