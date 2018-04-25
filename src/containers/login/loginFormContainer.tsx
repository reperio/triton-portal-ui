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
                    {this.props.authSession.errorMessages.length > 0 ? <Error errors={this.props.authSession.errorMessages}/> : null}
                    <LoginForm onSubmit={this.onSubmit.bind(this)}/>
                    <div>
                        Don't have an account?
                        <LinkContainer to="/create-account"><NavItem>Create Account</NavItem></LinkContainer>
                    </div>
                </div>
            :
            <Redirect to="/home"/>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({submitAuth}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(LoginFormContainer);