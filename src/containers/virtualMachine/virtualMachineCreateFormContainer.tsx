import React from 'react'
import { connect } from "react-redux";
import { createVm, selectPrimaryNic } from "../../actions/virtualMachineActions";
import { getAllPackages, showPackageInformation } from "../../actions/packagesActions";
import { getAllFabricNetworksByOwnerId, selectNetworks } from "../../actions/networkActions";
import { bindActionCreators } from "redux";
import VirtualMachineCreateForm from "../../components/virtualMachine/virtualMachineCreateForm";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import Error from "../../components/misc/error";
import { formValueSelector } from 'redux-form';
import VirtualMachineCreateModel from '../../models/virtualMachineCreateModel';

class VirtualMachineCreateFormContainer extends React.Component {
    props: any;

    async onSubmit(values: VirtualMachineCreateModel) {
        await this.props.actions.createVm(this.props.authSession.user.data.ownerUuid, values.alias, values.nics, values.brand, this.props.packages.selectedPackage, values.image);
    };

    async componentDidMount() {
        await this.props.actions.getAllPackages();
        await this.props.actions.getAllFabricNetworksByOwnerId(this.props.authSession.user.data.ownerUuid);
    }

    async showPackageInformation(selectedPackage: any) {
        await this.props.actions.showPackageInformation(selectedPackage);
    }

    async selectNetworks(selectedNetworks: any[]) {
        await this.props.actions.selectNetworks(selectedNetworks);
    }

    async selectPrimaryNic(nicIndex: number) {
        await this.props.actions.selectPrimaryNic(nicIndex);
    }

    render() {
        return (
            <div>
                {this.props.virtualMachineCreate.isLoading || !this.props.packages.hasLoaded || !this.props.networks.hasLoaded  ? <LoadingSpinner/> : null}
                {this.props.packages.hasLoaded && this.props.networks.hasLoaded
                    ? <VirtualMachineCreateForm selectPrimaryNic={this.selectPrimaryNic.bind(this)} errorMessages={this.props.errorMessages} networks={this.props.networks} packages={this.props.packages} showPackageInformation={this.showPackageInformation.bind(this)} selectNetworks={this.selectNetworks.bind(this)} onSubmit={this.onSubmit.bind(this)} /> 
                    : null}
                
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('virtualMachineCreateForm');
    return {
        authSession: state.authSession,
        virtualMachineCreate: state.virtualMachineCreate,
        packages: state.packages,
        networks: state.networks,
        errorMessages: selector(state, "errorMessages")
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createVm, getAllPackages, showPackageInformation, getAllFabricNetworksByOwnerId, selectNetworks, selectPrimaryNic}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineCreateFormContainer);