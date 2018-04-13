import React from 'react'
import {connect} from "react-redux";
import {editAccount, loadAccount} from "../actions/accountEditActions";
import {bindActionCreators} from "redux";
import EditAccountForm from "../components/editAccountForm";
import LoadingSpinner from '../components/loadingSpinner';
import Error from '../components/error'
import EditAccountModel from '../models/editAccountModel';

class EditAccountFormContainer extends React.Component {
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
                {this.props.accountEdit.errorMessages.length > 0 ? <Error errors={this.props.accountEdit.errorMessages}/> : null}
                {!this.props.accountLoad.hasLoaded ? null : 
                <EditAccountForm initialValues={this.props.accountLoad.user} onSubmit={this.onSubmit.bind(this)} />}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        accountEdit: state.accountEdit,
        accountLoad: state.accountLoad,
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editAccount, loadAccount}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(EditAccountFormContainer);