import React from 'react'
import {connect} from "react-redux";
import {submitAuth} from "../actions/authActions";
import {bindActionCreators} from "redux";
import LoginForm from "../components/loginForm";
import LoadingSpinner from '../components/loadingSpinner';

class LoginFormValues {
    email: string;
    password: string;
}

class LoginFormContainer extends React.Component {
    props: any;

    async onSubmit(values: LoginFormValues) {
        await this.props.actions.submitAuth(values.email, values.password);
    };

    render() {
        return (
            <div>
                {this.props.authSession.isLoading ? <LoadingSpinner/> : null}
                <LoginForm onSubmit={this.onSubmit.bind(this)} authSession={this.props.authSession} />
            </div>
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