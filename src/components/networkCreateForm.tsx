import React from 'react'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import {DropdownList, Multiselect} from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';

const fieldArrayComponent = (props: any) => (
    <div>
        <button 
            type="button" 
            onClick={() => props.fields.push({})}
            className="btn btn-default">Add resolver ip
        </button>
        {props.fields.map((member:string, index:number) =>
            <div key={index} style={{paddingTop: "10px"}}>
                <div className="row" style={{maxWidth: "280px"}}>
                    <div className="field-array-component-item-label col-md-10">Resolver IP #{index + 1}</div>
                    <div className="col-md-1">
                        <button
                            className="btn btn-danger"
                            type="button"
                            title="Remove IP"
                            onClick={() => props.fields.remove(index)}>
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <Field
                    name={`${member}.ip`}
                    type="text"
                    component="input"
                    className="form-control"
                    style={{maxWidth: "280px"}}
                    placeholder="IP"/>
            </div>
        )}
    </div>
);

const NetworkCreateForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <h2>Create a network</h2>
        <FormGroup style={{maxWidth: "280px"}}>
         <Field 
            name="name" 
            component="input" 
            className="form-control" 
            type="text" 
            placeholder="Network Name" />
        </FormGroup>
        <FormGroup style={{maxWidth: "280px"}}>
            <Field
                name="description" 
                component="input" 
                className="form-control" 
                type="text" 
                placeholder="Description" />
        </FormGroup>
        <FormGroup style={{maxWidth: "280px"}}>
            <Field
                name="vlanId" 
                component="input" 
                className="form-control" 
                type="text" 
                placeholder="Vlan ID" />
        </FormGroup>
        <FormGroup style={{maxWidth: "280px"}}>
            <Field
                name="subnet" 
                component="input" 
                className="form-control" 
                type="text" 
                placeholder="Subnet" />
        </FormGroup>
        <FormGroup style={{maxWidth: "280px"}}>
            <Field
                name="provisionStartIp" 
                component="input" 
                className="form-control" 
                type="text" 
                placeholder="Provision Start IP" />
        </FormGroup>
        <FormGroup style={{maxWidth: "280px"}}>
            <Field
                name="provisionEndIp" 
                component="input" 
                className="form-control" 
                type="text" 
                placeholder="Provision End IP" />
        </FormGroup>
        <FormGroup style={{maxWidth: "280px"}}>
            <Field
                name="nicTag" 
                component="input" 
                className="form-control" 
                type="text" 
                placeholder="Nic Tag" />
        </FormGroup>
        <FormGroup style={{maxWidth: "280px"}}>
            <Field
                name="gateway" 
                component="input" 
                className="form-control" 
                type="text" 
                placeholder="Gateway IP" />
        </FormGroup>
        <FieldArray name="resolvers" component={fieldArrayComponent}/>
        <FormGroup>
            <button className="btn btn-primary" type="submit">Create</button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'networkCreateForm' })(NetworkCreateForm) as any;