import React from 'react'
import { connect } from "react-redux";
import { createAccount } from "../../actions/accountActions";
import { bindActionCreators } from "redux";
import AccountCreateForm from "../../components/account/accountCreateForm";
import { formValueSelector } from 'redux-form';
import UserModel from '../../models/userModel';
import { toggleLoadingBar } from "../../actions/navActions";

class AccountCreateFormContainer extends React.Component {
    props: any;

    async onSubmit(values: UserModel) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.createAccount(values);
        this.props.actions.toggleLoadingBar(false);
    };

    render() {
        return (
            <fieldset disabled={this.props.isLoading}>
                <AccountCreateForm  errorMessages={this.props.errorMessages} 
                                    onSubmit={this.onSubmit.bind(this)} />
            </fieldset>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('accountCreateForm');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        accountCreate: state.accountCreate,
        errorMessages: selector(state, 'errorMessages'),
        isLoading: selectorLoading(state, 'isLoading')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createAccount}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(AccountCreateFormContainer);