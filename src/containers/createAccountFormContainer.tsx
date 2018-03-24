import React from 'react'
import {connect} from "react-redux";
import {createAccount} from "../actions/createAccountActions";
import {bindActionCreators} from "redux";
import CreateAccountForm from "../components/createAccountForm";
import LoadingSpinner from '../components/loadingSpinner';

class AccountCreationValues {
    email: string;
    password: string;
    username: string;
    firstname: string;
    lastname: string;
}

class CreateAccountFormContainer extends React.Component {
    props: any;

    async onSubmit(values: AccountCreationValues) {
        await this.props.actions.createAccount(values.username, values.password, values.firstname, values.lastname, values.email);
    };

    render() {
        return (
            <div>
                {this.props.authSession.isLoading ? <LoadingSpinner/> : null}
                <CreateAccountForm onSubmit={this.onSubmit.bind(this)} authSession={this.props.authSession} />
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
        actions: bindActionCreators({createAccount}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(CreateAccountFormContainer);