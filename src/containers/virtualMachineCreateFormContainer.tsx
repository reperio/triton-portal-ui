import React from 'react'
import { connect } from "react-redux";
import { createVm } from "../actions/virtualMachineActions";
import { getAllPackages, showPackageInformation} from "../actions/packagesActions";
import { getAllNetworksByOwnerId, selectNetworks } from "../actions/networkActions";
import { bindActionCreators } from "redux";
import VirtualMachineCreateForm from "../components/virtualMachineCreateForm";
import LoadingSpinner from '../components/loadingSpinner';
import Error from "../components/error";

class CreateVirtualMachineFormValues {
    alias: string;
    image: string;
    brand: string;
}

class VirtualMachineCreateFormContainer extends React.Component {
    props: any;

    async onSubmit(values: CreateVirtualMachineFormValues) {
        await this.props.actions.createVm(this.props.authSession.user.data.ownerUuid, values.alias, ["f55fa625-6105-4d99-9ea8-6476bd2eea1d"], values.brand, this.props.packages.selectedPackage.uuid, values.image);
    };

    async componentDidMount() {
        await this.props.actions.getAllPackages();
        await this.props.actions.getAllNetworksByOwnerId(this.props.authSession.user.data.ownerUuid);
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
                {this.props.createVirtualMachine.isLoading ? <LoadingSpinner/> : null}
                {this.props.createVirtualMachine.errorMessages.length > 0 ? <Error errors={this.props.createVirtualMachine.errorMessages}/> : null}
                <VirtualMachineCreateForm networks={this.props.networks} packages={this.props.packages} showPackageInformation={this.showPackageInformation.bind(this)} selectNetworks={this.selectNetworks.bind(this)} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession,
        createVirtualMachine: state.createVirtualMachine,
        packages: state.packages,
        networks: state.networks
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createVm, getAllPackages, showPackageInformation, getAllNetworksByOwnerId, selectNetworks}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineCreateFormContainer);