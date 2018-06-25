import React from 'react'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import { FormGroup, Button } from "react-bootstrap";
import { DropdownList } from 'react-widgets'
import Error from '../../components/misc/error';
import 'react-widgets/dist/css/react-widgets.css';

const fieldArrayComponent = (props: any) => (
    <div>
        {props.fields.map((member:string, index:number) =>
            <div key={index} className="field-array-component">
                <div>
                    <div className="field-array-component-item-label">Resolver IP #{index + 1}</div>
                    <div className="field-array-component-delete-button">
                        <button type='button' className="reperio-form-control reperio-btn reperio-warning" onClick={() => props.fields.remove(index)}>&nbsp;<span className="glyphicon glyphicon-trash" aria-hidden="true"></span>&nbsp;</button>
                    </div>
                </div>
                <FormGroup>
                    <Field  name={`${member}.ip`}
                            type="text"
                            component="input"
                            className="reperio-form-control reperio-text-input"
                            placeholder="IP"/>
                </FormGroup>
            </div>
        )}
        <div className="field-array-component">
            <button type='button' className="reperio-form-control reperio-btn reperio-neutral" onClick={() => props.fields.push({})}>Add resolver ip</button>
        </div>
    </div>
);

const NetworkCreateModal = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <FormGroup>
        <Field  name="name" 
                component="input" 
                className="reperio-form-control reperio-text-input"
                type="text" 
                placeholder="Network Name" />
        </FormGroup>
        <FormGroup>
            <Field  name="description" 
                    component="input" 
                    className="reperio-form-control reperio-text-input"
                    type="text" 
                    placeholder="Description" />
        </FormGroup>
        <FormGroup>
            <Field  name="subnet" 
                    component="input" 
                    className="reperio-form-control reperio-text-input"
                    type="text" 
                    placeholder="Subnet" />
        </FormGroup>
        <FormGroup>
            <Field  name="provisionStartIp" 
                    component="input" 
                    className="reperio-form-control reperio-text-input"
                    type="text" 
                    placeholder="Provision Start IP" />
        </FormGroup>
        <FormGroup>
            <Field  name="provisionEndIp" 
                    component="input" 
                    className="reperio-form-control reperio-text-input"
                    type="text" 
                    placeholder="Provision End IP" />
        </FormGroup>
        <FormGroup>
            <Field  name="nicTag" 
                    component="input" 
                    className="reperio-form-control reperio-text-input"
                    type="text" 
                    placeholder="Nic Tag" />
        </FormGroup>
        <FormGroup>
            <Field  name="gateway" 
                    component="input" 
                    className="reperio-form-control reperio-text-input"
                    type="text" 
                    placeholder="Gateway IP" />
        </FormGroup>
        <FieldArray name="resolvers" 
                    component={fieldArrayComponent}/>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'networkCreateModal' })(NetworkCreateModal) as any;