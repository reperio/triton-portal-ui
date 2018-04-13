import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import {FormGroup} from "react-bootstrap";

const AccountCreateForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <h2>Create an account</h2>
        <FormGroup>
            <Field name="username" component="input" className="form-control" type="text" placeholder="Username"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field name="password" component="input" className="form-control" type="password" placeholder="Password"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field name="confirmPassword" component="input" className="form-control" type="password" placeholder="Confirm Password"
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
            <Field name="email" component="input" className="form-control" type="text" placeholder="Email"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <button className="btn btn-primary" type="submit">Create account</button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'accountCreate' })(AccountCreateForm) as any;