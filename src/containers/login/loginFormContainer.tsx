import React from 'react'
import { connect } from "react-redux";
import { submitAuth } from "../../actions/authActions";
import { locationChange } from "../../actions/navActions";
import { bindActionCreators } from "redux";
import LoginForm from "../../components/login/loginForm";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";
import { NavItem, Button } from "react-bootstrap";
import Error from "../../components/misc/error";
import LoginModel from '../../models/loginModel';
import { Redirect } from "react-router";
import { formValueSelector } from 'redux-form';
import { toggleLoadingBar } from "../../actions/navActions";

class LoginFormContainer extends React.Component {
    props: any;

    async onSubmit(form: LoginModel) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.submitAuth(form.email, form.password);
        this.props.actions.toggleLoadingBar(false);
    };

    locationChange(location: string) {
        this.props.actions.locationChange(location);
    }

    render() {
        return (
            !this.props.authSession.isAuthenticated ? 
                <fieldset disabled={this.props.isLoading} className="login-form-container">
                    <LoginForm errorMessages={this.props.errorMessages} onSubmit={this.onSubmit.bind(this)}/>
                    <div className="create-account">
                        <div>
                            Don't have an account?
                        </div>
                        <LinkContainer to="/create-account">
                            <button className="reperio-form-control reperio-btn reperio-neutral" type="submit" onClick={() => this.locationChange('/create-account')}>Create Account</button>
                        </LinkContainer>
                    </div>
                </fieldset>
            : null
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('loginForm');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        authSession: state.authSession,
        errorMessages: selector(state, 'errorMessages'),
        isLoading: selectorLoading(state, 'isLoading')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({submitAuth, locationChange, toggleLoadingBar}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(LoginFormContainer);