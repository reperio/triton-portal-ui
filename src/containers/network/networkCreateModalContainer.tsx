import React from 'react'
import { connect } from "react-redux";
import { createFabricNetwork } from "../../actions/networkActions";
import { bindActionCreators } from "redux";
import { formValueSelector } from 'redux-form';
import NetworkCreateModal from '../../components/network/networkCreateModal';
import NetworkModel from '../../models/networkModel';

class NetworkCreateModalContainer extends React.Component {
    props: any;

    async onSubmit(form: NetworkModel) {
        await this.props.actions.createFabricNetwork(form, this.props.authSession.user.data.ownerUuid);
    };

    render() {
        return (
            <div>
                <NetworkCreateModal errorMessages={this.props.errorMessages} 
                                    onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('networkCreateModal');
    return {
        authSession: state.authSession,
        errorMessages: selector(state, 'errorMessages')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createFabricNetwork}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NetworkCreateModalContainer);