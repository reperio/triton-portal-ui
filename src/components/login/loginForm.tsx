import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormGroup } from "react-bootstrap";
import Error from '../../components/misc/error';

const LoginForm = (props: any) => (
    <form className="login-form" onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.errorMessages != null && props.errorMessages.length > 0 ? <Error errors={props.errorMessages}/> : null}
        <h2>Login</h2>
        <FormGroup>
            <Field  name="email" 
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="text"
                    autoFocus
                    placeholder="Email"/>
        </FormGroup>
        <FormGroup>
            <Field  name="password"
                    component="input"
                    className="reperio-form-control reperio-text-input"
                    type="password"
                    placeholder="Password"/>
        </FormGroup>
        <FormGroup>
            <button className="reperio-form-control reperio-btn reperio-success" type="submit">Sign in</button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'loginForm' })(LoginForm) as any;