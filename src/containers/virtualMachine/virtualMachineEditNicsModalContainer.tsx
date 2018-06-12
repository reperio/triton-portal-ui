import React from 'react'
import { connect } from "react-redux";
import { editVmNics, hideNicModal, selectPrimaryNic, getVmsByOwner } from "../../actions/virtualMachineActions";
import { getAllFabricNetworksByOwnerId, selectNetworks } from "../../actions/networkActions";
import { bindActionCreators } from "redux";
import VirtualMachineEditNicsModal from "../../components/virtualMachine/virtualMachineEditNicsModal";
import { formValueSelector } from 'redux-form';
import { toggleLoadingBar } from "../../actions/navActions";

class VirtualMachineEditNicsModalContainer extends React.Component {
    props: any;

    async componentDidMount() {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.getAllFabricNetworksByOwnerId(this.props.authSession.user.data.ownerUuid);
        this.props.actions.toggleLoadingBar(false);
    }

    async closeEditNicModal() {
        await this.props.actions.hideNicModal();
    }

    async editNicModal(form: any) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.editVmNics(form.nics, this.props.row.original.uuid, this.props.authSession.user.data.ownerUuid);
        this.props.actions.toggleLoadingBar(false);
    }

    async selectNetworks(selectedNetworks: any[]) {
        await this.props.actions.selectNetworks(selectedNetworks);
    }

    async selectPrimaryNic(nicIndex: number) {
        await this.props.actions.selectPrimaryNic(nicIndex, 'virtualMachineEditNicsModal');
    }

    render() {
        return (
            <fieldset disabled={this.props.isLoading}>
                <VirtualMachineEditNicsModal    close={this.closeEditNicModal.bind(this)} 
                                                onSubmit={this.editNicModal.bind(this)} 
                                                networks={this.props.networks} 
                                                selectNetworks={this.selectNetworks.bind(this)}
                                                initialValues={{nics: this.props.row.original.nics}}
                                                selectPrimaryNic={this.selectPrimaryNic.bind(this)}
                                                errorMessages={this.props.errorMessages}/>
            </fieldset>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineEditNicsModal');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        authSession: state.authSession,
        networks: state.networks,
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row'),
        isLoading: selectorLoading(state, 'isLoading')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editVmNics, hideNicModal, getAllFabricNetworksByOwnerId, selectNetworks, selectPrimaryNic, getVmsByOwner, toggleLoadingBar}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineEditNicsModalContainer);