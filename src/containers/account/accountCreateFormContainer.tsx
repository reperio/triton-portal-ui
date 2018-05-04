import React from 'react'
import { connect } from "react-redux";
import { createAccount } from "../../actions/accountActions";
import { bindActionCreators } from "redux";
import AccountCreateForm from "../../components/account/accountCreateForm";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import Error from '../../components/misc/error'
import CreateAccountModel from '../../models/createAccountModel';
import { formValueSelector } from 'redux-form';

class AccountCreateFormContainer extends React.Component {
    props: any;

    async onSubmit(values: CreateAccountModel) {
        await this.props.actions.createAccount(values);
    };

    render() {
        return (
            <div>
                {this.props.accountCreate.isLoading ? <LoadingSpinner/> : null}
                <AccountCreateForm errorMessages={this.props.errorMessages} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('accountCreateForm');
    return {
        accountCreate: state.accountCreate,
        errorMessages: selector(state, 'errorMessages')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createAccount}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(AccountCreateFormContainer);