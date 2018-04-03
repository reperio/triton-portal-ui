import React from 'react'
import {connect} from "react-redux";
import {editAccount} from "../actions/accountActions";
import {bindActionCreators} from "redux";
import EditAccountForm from "../components/editAccountForm";
import LoadingSpinner from '../components/loadingSpinner';
import Error from '../components/error'

class EditAccountValues {
    email: string;
    oldPassword: string;
    password: string;
    username: string;
    firstname: string;
    lastname: string;
    confirmPassword: string;
    sshKeys: any[];
}

class EditAccountFormContainer extends React.Component {
    props: any;

    async onSubmit(values: EditAccountValues) {
        //await this.props.actions.editAccount(values.username, values.password, values.confirmPassword, values.firstname, values.lastname, values.email);
    };

    render() {
        return (
            <div>
                {this.props.account.isLoading ? <LoadingSpinner/> : null}
                {this.props.account.errorMessages.length > 0 ? <Error errors={this.props.account.errorMessages}/> : null}
                <EditAccountForm initialValues={this.props.authSession.user.data} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        account: state.account,
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editAccount}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(EditAccountFormContainer);