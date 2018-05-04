import React from 'react'
import {connect} from "react-redux";
import { editAccount, loadAccount } from "../../actions/accountActions";
import {bindActionCreators} from "redux";
import AccountEditForm from "../../components/account/accountEditForm";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import Error from '../../components/misc/error'
import EditAccountModel from '../../models/editAccountModel';
import { formValueSelector } from 'redux-form';

class AccountEditFormContainer extends React.Component {
    props: any;

    async onSubmit(values: EditAccountModel) {
        await this.props.actions.editAccount(values, this.props.authSession.user.data.id);
    };

    async componentDidMount () {
        await this.props.actions.loadAccount(this.props.authSession.user.data.id);
    };

    render() {
        return (
            <div>
                {this.props.accountEdit.isLoading || !this.props.accountLoad.hasLoaded ? <LoadingSpinner/> : null}
                {!this.props.accountLoad.hasLoaded ? null : 
                <AccountEditForm errorMessages={this.props.errorMessages} initialValues={this.props.accountLoad.user} onSubmit={this.onSubmit.bind(this)} />}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('accountEditForm');
    return {
        accountEdit: state.accountEdit,
        accountLoad: state.accountLoad,
        authSession: state.authSession,
        errorMessages: selector(state, 'errorMessages')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editAccount, loadAccount}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(AccountEditFormContainer);