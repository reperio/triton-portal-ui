import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";

const required = (value:any) => value ? undefined : 'Required'
const email = (value:any) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

const CreateAccountForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.authSession.isError ? <p className="alert alert-danger">{props.authSession.errorMessage}</p> : ""}
        <h2>Create an account</h2>
        <FormGroup>
            <Field name="username" component="input" className="form-control" type="text" placeholder="Username"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field name="password" component="input" className="form-control" type="text" placeholder="Password"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field name="confirmPassword" component="input" className="form-control" type="text" placeholder="Confirm Password"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field name="firstname" component="input" className="form-control" type="text" placeholder="First Name"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field name="lastname" component="input" className="form-control" type="text" placeholder="Last Name"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field validate={[ required, email]} name="email" component="input" className="form-control" type="text" placeholder="Email"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <button className="btn btn-primary" type="submit">Create account</button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'createAccount' })(CreateAccountForm) as any;