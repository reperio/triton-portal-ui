import React from 'react'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import { FormGroup, Button } from "react-bootstrap";
import { DropdownList } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';
import Error from '../../components/misc/error';

const fieldArrayComponent = (props: any) => (
    <div>
        {props.fields.map((member:string, index:number) =>
            <div key={index} className="field-array-component" style={{position: "relative"}}>
                <div>
                    <div className="field-array-component-item-label">Resolver IP #{index + 1}</div>
                    <div className="field-array-component-delete-button">
                        <Button bsStyle="danger"
                                onClick={() => props.fields.remove(index)}>&nbsp;
                                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                    &nbsp;
                        </Button>
                    </div>
                </div>
                <FormGroup>
                    <Field  name={`${member}.ip`}
                            type="text"
                            component="input"
                            className="form-control"
                            placeholder="IP"/>
                </FormGroup>
            </div>
        )}
        <div className="field-array-component">
            <Button bsStyle="default"
                    onClick={() => props.fields.push({})}>Add resolver ip
            </Button>
        </div>
    </div>
);

const NetworkCreateForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)} className="redux-form">
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <h2>Create a network</h2>
        <FormGroup>
        <Field  name="name" 
                component="input" 
                className="form-control" 
                type="text" 
                placeholder="Network Name" />
        </FormGroup>
        <FormGroup>
            <Field  name="description" 
                    component="input" 
                    className="form-control" 
                    type="text" 
                    placeholder="Description" />
        </FormGroup>
        <FormGroup>
            <Field  name="subnet" 
                    component="input" 
                    className="form-control" 
                    type="text" 
                    placeholder="Subnet" />
        </FormGroup>
        <FormGroup>
            <Field  name="provisionStartIp" 
                    component="input" 
                    className="form-control" 
                    type="text" 
                    placeholder="Provision Start IP" />
        </FormGroup>
        <FormGroup>
            <Field  name="provisionEndIp" 
                    component="input" 
                    className="form-control" 
                    type="text" 
                    placeholder="Provision End IP" />
        </FormGroup>
        <FormGroup>
            <Field  name="nicTag" 
                    component="input" 
                    className="form-control" 
                    type="text" 
                    placeholder="Nic Tag" />
        </FormGroup>
        <FormGroup>
            <Field  name="gateway" 
                    component="input" 
                    className="form-control" 
                    type="text" 
                    placeholder="Gateway IP" />
        </FormGroup>
        <FieldArray name="resolvers" 
                    component={fieldArrayComponent}/>
        <FormGroup>
            <Button bsStyle="primary" type="submit">Create</Button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'networkCreateForm' })(NetworkCreateForm) as any;