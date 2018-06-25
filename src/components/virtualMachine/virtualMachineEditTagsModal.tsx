import React from 'react';
import { reduxForm, FieldArray } from 'redux-form'
import { FormGroup } from "react-bootstrap";
import  { TagFieldArrayComponent } from '../virtualMachine/tagFieldArrayComponent';
import Error from '../../components/misc/error';

const VirtualMachineEditTagsModal = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <FormGroup>
            <FieldArray name="tags"
                        component={TagFieldArrayComponent}/>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'virtualMachineEditTagsModal' })(VirtualMachineEditTagsModal) as any;