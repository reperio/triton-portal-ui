import React from 'react'
import { connect } from "react-redux";
import { createFabricNetwork } from "../../actions/networkActions";
import { bindActionCreators } from "redux";
import NetworkCreateForm from "../../components/network/networkCreateForm";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import CreateNetworkModel from '../../models/createNetworkModel';
import { formValueSelector } from 'redux-form';

class NetworkCreateFormContainer extends React.Component {
    props: any;

    async onSubmit(network: CreateNetworkModel) {
        await this.props.actions.createFabricNetwork(network, this.props.authSession.user.data.ownerUuid);
    };

    render() {
        return (
            <div>
                {this.props.networkCreate.isLoading ? <LoadingSpinner/> : null}
                <NetworkCreateForm  errorMessages={this.props.errorMessages} 
                                    onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('networkCreateForm');
    return {
        networkCreate: state.networkCreate,
        authSession: state.authSession,
        errorMessages: selector(state, 'errorMessages')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createFabricNetwork}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NetworkCreateFormContainer);