import React from 'react'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import { FormGroup, Button } from "react-bootstrap";
import { DropdownList, Multiselect } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';
import Error from '../../components/misc/error';

const fieldArrayComponent = (props: any) => (
    <div>
        {props.fields.map((member:string, index:number) =>
            <div key={index} className="field-array-component" style={{maxWidth: "280px", position: "relative"}}>
                <div>
                    <div className="field-array-component-item-label">Resolver IP #{index + 1}</div>
                    <div className="field-array-component-delete-button">
                        <Button
                            bsStyle="danger"
                            onClick={() => props.fields.remove(index)}>&nbsp;
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                &nbsp;
                        </Button>
                    </div>
                </div>
                <FormGroup>
                    <Field
                        name={`${member}.ip`}
                        type="text"
                        component="input"
                        className="form-control"
                        style={{maxWidth: "280px"}}
                        placeholder="IP"/>
                </FormGroup>
            </div>
        )}
        <div className="field-array-component" style={{maxWidth: "280px"}}>
            <Button
                bsStyle="default"
                onClick={() => props.fields.push({})}>Add resolver ip
            </Button>
        </div>
    </div>
);

const NetworkCreateForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
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