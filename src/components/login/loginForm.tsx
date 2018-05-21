import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormGroup, Button } from "react-bootstrap";
import Error from '../../components/misc/error';

const LoginForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)} className="redux-form">
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <h2>Please sign in</h2>
        <FormGroup>
            <Field  name="email" 
                    component="input"
                    className="form-control"
                    type="text"
                    placeholder="Email"/>
        </FormGroup>
        <FormGroup>
            <Field  name="password"
                    component="input"
                    className="form-control"
                    type="password"
                    placeholder="Password"/>
        </FormGroup>
        <FormGroup>
            <Button bsStyle="primary" type="submit">Sign in</Button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'loginForm' })(LoginForm) as any;