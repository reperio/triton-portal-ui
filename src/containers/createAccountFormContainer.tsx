import React from 'react'
import {connect} from "react-redux";
import {createAccount} from "../actions/accountCreateActions";
import {bindActionCreators} from "redux";
import CreateAccountForm from "../components/createAccountForm";
import LoadingSpinner from '../components/loadingSpinner';
import Error from '../components/error'
import CreateAccountModel from '../models/createAccountModel';

class CreateAccountFormContainer extends React.Component {
    props: any;

    async onSubmit(values: CreateAccountModel) {
        await this.props.actions.createAccount(values.username, values.password, values.confirmPassword, values.firstname, values.lastname, values.email);
    };

    render() {
        return (
            <div>
                {this.props.accountCreate.isLoading ? <LoadingSpinner/> : null}
                {this.props.accountCreate.errorMessages.length > 0 ? <Error errors={this.props.accountCreate.errorMessages}/> : null}
                <CreateAccountForm onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        accountCreate: state.accountCreate
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createAccount}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(CreateAccountFormContainer);