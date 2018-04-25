import React from 'react'
import { connect } from "react-redux";
import { createFabricNetwork } from "../../actions/networkActions";
import { bindActionCreators } from "redux";
import NetworkCreateForm from "../../components/network/networkCreateForm";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import Error from '../../components/misc/error'
import CreateAccountModel from '../../models/createAccountModel';
import CreateNetworkModel from '../../models/createNetworkModel';

class NetworkCreateFormContainer extends React.Component {
    props: any;

    async onSubmit(network: CreateNetworkModel) {
        await this.props.actions.createFabricNetwork(network, this.props.authSession.user.data.ownerUuid);
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
        networkCreate: state.networkCreate,
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createFabricNetwork}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NetworkCreateFormContainer);