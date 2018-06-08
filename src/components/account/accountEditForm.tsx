import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { FormGroup, Button } from "react-bootstrap";
import Error from '../../components/misc/error';

const fieldArrayComponent = (props: any) => (
    <div>
        {props.fields.map((member:string, index:number) =>
            <div key={index} className="field-array-component" style={{position: "relative"}}>
                <div>
                    <div className="field-array-component-item-label">SSH Key #{index + 1}</div>
                    <div className="field-array-component-delete-button">
                        <button type='button' className="reperio-form-control reperio-btn reperio-warning" onClick={() => props.fields.remove(index)}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                    </div>
                </div>
                <Field  name={`${member}.key`}
                        type="text"
                        component="input"
                        className="reperio-form-control reperio-text-input"
                        placeholder="Key"/>
                <Field  name={`${member}.description`}
                        type="text"
                        component="input"
                        className="reperio-form-control reperio-text-input"
                        placeholder="Description"/>
            </div>
        )}
        <div className="field-array-component">
            <button type='button' className="reperio-form-control reperio-btn reperio-neutral" onClick={() => props.fields.push({})}>Add ssh key</button>
        </div>
    </div>
);

const AccountEditForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)} className="redux-form">
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <h2>Edit account</h2>
        <hr />
        <FormGroup>
            <label>Old Password</label>
            <Field  name="password" 
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="password"
                    placeholder="Current password"/>
        </FormGroup>
        <FormGroup>
            <label>New Password</label>
            <Field  name="newPassword" 
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="password"
                    placeholder="New password"/>
        </FormGroup>
        <FormGroup>
            <label>Confirm New Password</label>
            <Field  name="confirmNewPassword" 
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="password"
                    placeholder="Confirm new password"/>
        </FormGroup>
        <FormGroup>
            <label>Username</label>
            <Field  name="username"
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="text"
                    placeholder="Username"/>
        </FormGroup>
        <FormGroup>
            <label>First Name</label>
            <Field  name="firstName" 
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="text"
                    placeholder="First name"/>
        </FormGroup>        
        <FormGroup>
            <label>Last Name</label>
            <Field  name="lastName" 
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="text"
                    placeholder="Last name"/>
        </FormGroup>
        <FormGroup>
            <label>Email</label>
            <Field  name="email" 
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="text" placeholder="Email"/>
        </FormGroup>
        <FormGroup>
            <label>SSH Keys</label>
            <FieldArray name="sshKeys" 
                        component={fieldArrayComponent}/>
        </FormGroup>
        <FormGroup>
            <br />
            <button type='submit' className="reperio-form-control reperio-btn reperio-success">Save changes</button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'accountEditForm'})(AccountEditForm) as any;