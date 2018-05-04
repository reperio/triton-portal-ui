import React from 'react'
import {connect} from "react-redux";
import {submitAuth} from "../../actions/authActions";
import {bindActionCreators} from "redux";
import LoginForm from "../../components/login/loginForm";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";
import {NavItem} from "react-bootstrap";
import Error from "../../components/misc/error";
import LoginModel from '../../models/loginModel';
import {Redirect} from "react-router";
import { formValueSelector } from 'redux-form';

class LoginFormContainer extends React.Component {
    props: any;

    async onSubmit(values: LoginModel) {
        await this.props.actions.submitAuth(values.email, values.password);
    };

    render() {
        return (
            !this.props.authSession.isAuthenticated ? 
                <div>
                    {this.props.authSession.isLoading ? <LoadingSpinner/> : null}
                    <LoginForm errorMessages={this.props.errorMessages} onSubmit={this.onSubmit.bind(this)}/>
                    <div>
                        Don't have an account?
                        <LinkContainer to="/create-account"><NavItem>Create Account</NavItem></LinkContainer>
                    </div>
                </div>
            : null
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('loginForm');
    return {
        authSession: state.authSession,
        errorMessages: selector(state, 'errorMessages')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({submitAuth}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(LoginFormContainer);