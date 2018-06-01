import React from 'react'
import { connect } from "react-redux";
import { provisionVm, selectPrimaryNic, hideProvisionModal } from "../../actions/virtualMachineActions";
import { getAllPackages, showPackageInformation } from "../../actions/packagesActions";
import { getAllImages, selectImage } from "../../actions/imageActions";
import { getAllFabricNetworksByOwnerId, selectNetworks } from "../../actions/networkActions";
import { bindActionCreators } from "redux";
import VirtualMachineProvisionModal from "../../components/virtualMachine/virtualMachineProvisionModal";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import Error from "../../components/misc/error";
import { formValueSelector } from 'redux-form';
import VirtualMachineModel from '../../models/virtualMachineModel';
import { State } from '../../store/initialState';

class VirtualMachineProvisionModalContainer extends React.Component {
    props: any;

    async onSubmit(form: VirtualMachineModel) {
        await this.props.actions.provisionVm(this.props.authSession.user.data.ownerUuid, form.alias, form.nics, form.brand, this.props.packages.selectedPackage, form.image_uuid);
    };

    async componentDidMount() {
        await this.props.actions.getAllPackages('virtualMachineProvisionModal');
        await this.props.actions.getAllImages('virtualMachineProvisionModal');
        await this.props.actions.getAllFabricNetworksByOwnerId(this.props.authSession.user.data.ownerUuid);
    }

    async showPackageInformation(e: any) {
        await this.props.actions.showPackageInformation(e.target.value, this.props.packages.packages);
    }

    async selectNetworks(selectedNetworks: any[]) {
        await this.props.actions.selectNetworks(selectedNetworks);
    }

    selectImage(e: any) {
        this.props.actions.selectImage('virtualMachineProvisionModal', e.target.value, this.props.images.images);
    }

    async selectPrimaryNic(nicIndex: number) {
        await this.props.actions.selectPrimaryNic(nicIndex, 'virtualMachineProvisionModal');
    }

    async closeProvisionModal() {
        await this.props.actions.hideProvisionModal();
    }

    render() {
        return (
            <div>
                {this.props.packages.isLoading || this.props.networks.isLoading || this.props.images.isLoading || this.props.virtualMachineProvision.isLoading ? <LoadingSpinner/> : null}
                <VirtualMachineProvisionModal   selectPrimaryNic={this.selectPrimaryNic.bind(this)}
                                                errorMessages={this.props.errorMessages} 
                                                networks={this.props.networks}
                                                packages={this.props.packages}
                                                selectImage={this.selectImage.bind(this)}
                                                images={this.props.images}
                                                showPackageInformation={this.showPackageInformation.bind(this)} 
                                                selectNetworks={this.selectNetworks.bind(this)} 
                                                onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('virtualMachineProvisionModal');
    return {
        authSession: state.authSession,
        packages: state.packages,
        images: state.images,
        networks: state.networks,
        virtualMachineProvision: state.virtualMachineProvision,
        errorMessages: selector(state, "errorMessages")
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({provisionVm, getAllPackages, showPackageInformation, getAllFabricNetworksByOwnerId, selectNetworks, selectPrimaryNic, hideProvisionModal, getAllImages, selectImage}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineProvisionModalContainer);