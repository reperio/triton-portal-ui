import React from 'react'
import { connect } from "react-redux";
import { editAccount, getUserById } from "../../actions/accountActions";
import { bindActionCreators } from "redux";
import AccountEditForm from "../../components/account/accountEditForm";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import { formValueSelector } from 'redux-form';
import UserModel from '../../models/userModel';

class AccountEditFormContainer extends React.Component {
    props: any;

    async onSubmit(values: UserModel) {
        await this.props.actions.editAccount(values, this.props.authSession.user.data.id);
    };

    async componentDidMount () {
        await this.props.actions.getUserById(this.props.authSession.user.data.id);
    };

    render() {
        return (
            <div>
                {this.props.accountEdit.isLoading || this.props.account.isLoading  ? <LoadingSpinner/> : null}
                <AccountEditForm    errorMessages={this.props.errorMessages} 
                                    initialValues={this.props.account.user} 
                                    onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('accountEditForm');
    return {
        accountEdit: state.accountEdit,
        account: state.account,
        authSession: state.authSession,
        errorMessages: selector(state, 'errorMessages')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editAccount, getUserById}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(AccountEditFormContainer);