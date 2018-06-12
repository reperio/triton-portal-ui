import React from 'react'
import { connect } from "react-redux";
import { editAccount, getUserById } from "../../actions/accountActions";
import { bindActionCreators } from "redux";
import AccountEditForm from "../../components/account/accountEditForm";
import { formValueSelector } from 'redux-form';
import UserModel from '../../models/userModel';
import { toggleLoadingBar } from "../../actions/navActions";

class AccountEditFormContainer extends React.Component {
    props: any;

    async onSubmit(values: UserModel) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.editAccount(values, this.props.authSession.user.data.id);
        this.props.actions.toggleLoadingBar(false);
    };

    async componentDidMount () {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.getUserById(this.props.authSession.user.data.id);
        this.props.actions.toggleLoadingBar(false);
    };

    render() {
        return (
            <fieldset disabled={this.props.isLoading}>
                <AccountEditForm    errorMessages={this.props.errorMessages} 
                                    initialValues={this.props.account.user} 
                                    onSubmit={this.onSubmit.bind(this)} />
            </fieldset>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('accountEditForm');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        accountEdit: state.accountEdit,
        account: state.account,
        authSession: state.authSession,
        errorMessages: selector(state, 'errorMessages'),
        isLoading: selectorLoading(state, 'isLoading')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editAccount, getUserById, toggleLoadingBar}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(AccountEditFormContainer);