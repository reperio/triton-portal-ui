import React from 'react'
import { connect } from "react-redux";
import { createFabricNetwork } from "../../actions/networkActions";
import { bindActionCreators } from "redux";
import { formValueSelector } from 'redux-form';
import NetworkCreateModal from '../../components/network/networkCreateModal';
import NetworkModel from '../../models/networkModel';
import { toggleLoadingBar } from "../../actions/navActions";
import { State } from '../../store/initialState';

class NetworkCreateModalContainer extends React.Component {
    props: any;

    async onSubmit(form: NetworkModel) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.createFabricNetwork(form, this.props.authSession.user.ownerUuid);
        this.props.actions.toggleLoadingBar(false);
    };

    render() {
        return (
            <fieldset disabled={this.props.isLoading}>
                <NetworkCreateModal errorMessages={this.props.errorMessages} 
                                    onSubmit={this.onSubmit.bind(this)} />
            </fieldset>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('networkCreateModal');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        authSession: state.authSession,
        errorMessages: selector(state, 'errorMessages'),
        isLoading: selectorLoading(state, 'isLoading')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createFabricNetwork, toggleLoadingBar}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NetworkCreateModalContainer);