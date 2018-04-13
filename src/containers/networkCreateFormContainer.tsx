import React from 'react'
import { connect } from "react-redux";
import { createNetwork } from "../actions/networkActions";
import { bindActionCreators } from "redux";
import NetworkCreateForm from "../components/networkCreateForm";
import LoadingSpinner from '../components/loadingSpinner';
import Error from '../components/error'
import CreateAccountModel from '../models/createAccountModel';

class NetworkCreateFormContainer extends React.Component {
    props: any;

    async onSubmit(values: any) {
        //await this.props.actions.createAccount(values.username, values.password, values.confirmPassword, values.firstname, values.lastname, values.email);
    };

    render() {
        return (
            <div>
                {this.props.networkCreate.isLoading ? <LoadingSpinner/> : null}
                {this.props.networkCreate.errorMessages.length > 0 ? <Error errors={this.props.networkCreate.errorMessages}/> : null}
                <NetworkCreateForm onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        networkCreate: state.networkCreate
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createNetwork}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NetworkCreateFormContainer);