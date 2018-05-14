import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { FormGroup, Button } from "react-bootstrap";
import Error from '../../components/misc/error';

const fieldArrayComponent = (props: any) => (
    <div>
        {props.fields.map((member:string, index:number) =>
            <div key={index} className="field-array-component" style={{maxWidth: "280px", position: "relative"}}>
                <div>
                    <div className="field-array-component-item-label">SSH Key #{index + 1}</div>
                    <div className="field-array-component-delete-button">
                        <Button
                            bsStyle="danger"
                            onClick={() => props.fields.remove(index)}>&nbsp;
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                &nbsp;
                        </Button>
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
        <div className="field-array-component" style={{maxWidth: "280px"}}>
            <Button
                bsStyle="default"
                onClick={() => props.fields.push({})}>Add ssh key
            </Button>
        </div>
    </div>
);

const AccountEditForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <h2>Edit account</h2>
        <FormGroup>
            <label>Old Password</label>
            <Field name="currentPassword" component="input" className="form-control" type="password" placeholder="Current password"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <label>New Password</label>
            <Field name="newPassword" component="input" className="form-control" type="password" placeholder="New password"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <label>Confirm New Password</label>
            <Field name="confirmNewPassword" component="input" className="form-control" type="password" placeholder="Confirm new password"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <label>Username</label>
            <Field name="username" component="input" className="form-control" type="text" placeholder="Username"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <label>First Name</label>
            <Field name="firstName" component="input" className="form-control" type="text" placeholder="First name"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>        
        <FormGroup>
            <label>Last Name</label>
            <Field name="lastName" component="input" className="form-control" type="text" placeholder="Last name"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <label>Email</label>
            <Field name="email" component="input" className="form-control" type="text" placeholder="Email"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <label>SSH Keys</label>
            <FieldArray name="sshKeys" component={fieldArrayComponent}/>
        </FormGroup>
        <FormGroup>
            <br />
            <button className="btn btn-primary" type="submit">Save changes</button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'accountEditForm'})(AccountEditForm) as any;