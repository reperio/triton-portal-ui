import React from 'react'
import { connect } from "react-redux";
import { editVmNics, hideNicModal, selectPrimaryNic, getVmsByOwner } from "../../actions/virtualMachineActions";
import { getAllFabricNetworksByOwnerId, selectNetworks } from "../../actions/networkActions";
import { bindActionCreators } from "redux";
import VirtualMachineEditNicsModal from "../../components/virtualMachine/virtualMachineEditNicsModal";
import { formValueSelector } from 'redux-form';
import LoadingSpinner from '../../components/misc/loadingSpinner';

class VirtualMachineEditNicsModalContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getAllFabricNetworksByOwnerId(this.props.authSession.user.data.ownerUuid);
    }

    async closeEditNicModal() {
        await this.props.actions.hideNicModal();
    }

    async editNicModal(form: any) {
        await this.props.actions.editVmNics(form.nics, this.props.row.original.uuid, this.props.authSession.user.data.ownerUuid);
    }

    async selectNetworks(selectedNetworks: any[]) {
        await this.props.actions.selectNetworks(selectedNetworks);
    }

    async selectPrimaryNic(nicIndex: number) {
        await this.props.actions.selectPrimaryNic(nicIndex, 'virtualMachineEditNicsModal');
    }

    render() {
        return (
            <div>
                {!this.props.networks.hasLoaded ? <LoadingSpinner/> : 
                    <VirtualMachineEditNicsModal    close={this.closeEditNicModal.bind(this)} 
                                                    onSubmit={this.editNicModal.bind(this)} 
                                                    networks={this.props.networks} 
                                                    selectNetworks={this.selectNetworks.bind(this)}
                                                    initialValues={{nics: this.props.row.original.nics}}
                                                    selectPrimaryNic={this.selectPrimaryNic.bind(this)}
                                                    errorMessages={this.props.errorMessages}/>}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineEditNicsModal');
    return {
        authSession: state.authSession,
        networks: state.networks,
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editVmNics, hideNicModal, getAllFabricNetworksByOwnerId, selectNetworks, selectPrimaryNic, getVmsByOwner}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineEditNicsModalContainer);