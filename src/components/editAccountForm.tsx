import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import {FormGroup} from "react-bootstrap";

const fieldArrayComponent = (props: any) => (
    <div>
        <button 
            type="button" 
            onClick={() => props.fields.push({})}
            className="btn btn-default">Add SSH Key
        </button>
        {props.fields.map((member:string, index:number) =>
            <div key={index} style={{paddingTop: "10px"}}>
                <div className="row" style={{maxWidth: "280px"}}>
                    <div className="ssh-key-label col-md-10">SSH Key #{index + 1}</div>
                    <div className="col-md-1">
                        <button
                            className="btn btn-danger"
                            type="button"
                            title="Remove key"
                            onClick={() => props.fields.remove(index)}>
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <Field
                    name={`${member}.key`}
                    type="text"
                    component="input"
                    className="form-control"
                    style={{maxWidth: "280px"}}
                    placeholder="Key"/>
                <Field
                    name={`${member}.description`}
                    type="text"
                    component="input"
                    className="form-control"
                    style={{maxWidth: "280px"}}
                    placeholder="Description"/>
            </div>
        )}
    </div>
);

const EditAccountForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <h2>Edit account</h2>
        <FormGroup>
            <label>Old Password</label>
            <Field name="oldPassword" component="input" className="form-control" type="password" placeholder="Old Password"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field name="username" component="input" className="form-control" type="text" placeholder="Username"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <label>New Password</label>
            <Field name="newPassword" component="input" className="form-control" type="password" placeholder="New Password"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <label>Confirm New Password</label>
            <Field name="confirmNewPassword" component="input" className="form-control" type="password" placeholder="Confirm New Password"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <label>First Name</label>
            <Field name="firstName" component="input" className="form-control" type="text" placeholder="First Name"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>        
        <FormGroup>
            <label>Last Name</label>
            <Field name="lastName" component="input" className="form-control" type="text" placeholder="Last Name"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <label>Email</label>
            <Field name="email" component="input" className="form-control" type="text" placeholder="Email"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FieldArray name="sshKeys" component={fieldArrayComponent}/>
        <FormGroup>
            <button className="btn btn-primary" type="submit">Save changes</button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'editAccount'})(EditAccountForm) as any;