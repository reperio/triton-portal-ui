import React from 'react'
import { connect } from "react-redux";
import { createVm } from "../../actions/virtualMachineCreateActions";
import { getAllPackages, showPackageInformation} from "../../actions/packagesActions";
import { getAllFabricNetworksByOwnerId, selectNetworks } from "../../actions/networkActions";
import { bindActionCreators } from "redux";
import VirtualMachineCreateForm from "../../components/virtualMachine/virtualMachineCreateForm";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import Error from "../../components/misc/error";

class CreateVirtualMachineFormValues {
    alias: string;
    image: string;
    brand: string;
}

class VirtualMachineCreateFormContainer extends React.Component {
    props: any;

    async onSubmit(values: any) {
        await this.props.actions.createVm(this.props.authSession.user.data.ownerUuid, values.alias, this.props.networks.selectedNetworks, values.brand, this.props.packages.selectedPackage, values.image);
    };

    async componentDidMount() {
        await this.props.actions.getAllPackages();
        await this.props.actions.getAllFabricNetworksByOwnerId(this.props.authSession.user.data.ownerUuid);
    }

    async showPackageInformation(selectedPackage: any) {
        await this.props.actions.showPackageInformation(this.props.packages.packages, selectedPackage);
    }

    async selectNetworks(selectedNetworks: any[]) {
        await this.props.actions.selectNetworks(this.props.networks.networks, selectedNetworks);
    }

    render() {
        return (
            <div>
                {this.props.virtualMachineCreate.isLoading || !this.props.packages.hasLoaded || !this.props.networks.hasLoaded  ? <LoadingSpinner/> : null}
                {this.props.virtualMachineCreate.errorMessages.length > 0 ? <Error errors={this.props.virtualMachineCreate.errorMessages}/> : null}
                {this.props.packages.hasLoaded && this.props.networks.hasLoaded
                    ? <VirtualMachineCreateForm networks={this.props.networks} packages={this.props.packages} showPackageInformation={this.showPackageInformation.bind(this)} selectNetworks={this.selectNetworks.bind(this)} onSubmit={this.onSubmit.bind(this)} /> 
                    : null}
                
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession,
        virtualMachineCreate: state.virtualMachineCreate,
        packages: state.packages,
        networks: state.networks
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createVm, getAllPackages, showPackageInformation, getAllFabricNetworksByOwnerId, selectNetworks}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineCreateFormContainer);