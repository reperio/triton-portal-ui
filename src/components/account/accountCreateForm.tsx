import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { FormGroup, Button } from "react-bootstrap";
import Error from '../../components/misc/error';

const AccountCreateForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)} className="redux-form">
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <h2>Create an account</h2>
        <hr />
        <FormGroup>
            <label>Username</label>
            <Field  name="username"
                    component="input" 
                    className="reperio-form-control reperio-text-input"
                    type="text"
                    autoFocus
                    placeholder="Username"/>
        </FormGroup>
        <FormGroup>
            <label>Password</label>
            <Field  name="password"
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="password"
                    placeholder="Password"/>
        </FormGroup>
        <FormGroup>
            <label>Confirm password</label>
            <Field  name="confirmNewPassword"
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="password"
                    placeholder="Confirm Password"/>
        </FormGroup>
        <FormGroup>
            <label>First name</label>
            <Field  name="firstName" 
                    component="input" 
                    className="reperio-form-control reperio-text-input"
                    type="text" 
                    placeholder="First Name"/>
        </FormGroup>
        <FormGroup>
            <label>Last name</label>
            <Field  name="lastName"
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="text"
                    placeholder="Last Name"/>
        </FormGroup>
        <FormGroup>
            <label>Email address</label>
            <Field  name="email"
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="text"
                    placeholder="Email"/>
        </FormGroup>
        <FormGroup>
            <label>Owner uuid</label>
            <Field  name="ownerUuid" 
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="text"
                    placeholder="Owner UUID"/>
        </FormGroup>
        <FormGroup>
            <button className="reperio-form-control reperio-btn reperio-success" type="submit">Create Account</button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'accountCreateForm' })(AccountCreateForm) as any;