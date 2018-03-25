import React from 'react'
import {connect} from "react-redux";
import {createAccount} from "../actions/accountActions";
import {bindActionCreators} from "redux";
import CreateAccountForm from "../components/createAccountForm";
import LoadingSpinner from '../components/loadingSpinner';
import Error from '../components/error'

class AccountCreationValues {
    email: string;
    password: string;
    username: string;
    firstname: string;
    lastname: string;
    confirmPassword: string;
}

class CreateAccountFormContainer extends React.Component {
    props: any;

    async onSubmit(values: AccountCreationValues) {
        await this.props.actions.createAccount(values.username, values.password, values.confirmPassword, values.firstname, values.lastname, values.email);
    };

    render() {
        return (
            <div>
                {this.props.account.isLoading ? <LoadingSpinner/> : null}
                {this.props.account.errorMessages.length > 0 ? <Error errors={this.props.account.errorMessages}/> : null}
                <CreateAccountForm onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        account: state.account
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createAccount}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(CreateAccountFormContainer);