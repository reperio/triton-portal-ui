import React from 'react'
import { connect } from "react-redux";
import { submitAuth } from "../../actions/authActions";
import { locationChange } from "../../actions/navActions";
import { bindActionCreators } from "redux";
import LoginForm from "../../components/login/loginForm";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";
import { NavItem, Button } from "react-bootstrap";
import Error from "../../components/misc/error";
import LoginModel from '../../models/loginModel';
import { Redirect } from "react-router";
import { formValueSelector } from 'redux-form';

class LoginFormContainer extends React.Component {
    props: any;

    async onSubmit(form: LoginModel) {
        await this.props.actions.submitAuth(form.email, form.password);
    };

    locationChange(location: string) {
        this.props.actions.locationChange(location);
    }

    render() {
        return (
            !this.props.authSession.isAuthenticated ? 
                <div className="login-form-container">
                    {this.props.authSession.isLoading ? <LoadingSpinner/> : null}
                    <LoginForm errorMessages={this.props.errorMessages} onSubmit={this.onSubmit.bind(this)}/>
                    <div className="create-account">
                        <div>
                            Don't have an account?
                        </div>
                        <LinkContainer to="/create-account">
                            <button className="reperio-form-control reperio-btn reperio-neutral" type="submit" onClick={() => this.locationChange('/create-account')}>Create Account</button>
                        </LinkContainer>
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
        actions: bindActionCreators({submitAuth, locationChange}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(LoginFormContainer);