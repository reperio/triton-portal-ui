import React from 'react'
import { connect } from "react-redux";
import { provisionVm, selectPrimaryNic, hideProvisionModal } from "../../actions/virtualMachineActions";
import { getAllPackages, showPackageInformation } from "../../actions/packagesActions";
import { getAllImages, selectImage } from "../../actions/imageActions";
import { getAllFabricNetworksByOwnerId, selectNetworks } from "../../actions/networkActions";
import { bindActionCreators } from "redux";
import VirtualMachineProvisionModal from "../../components/virtualMachine/virtualMachineProvisionModal";
import Error from "../../components/misc/error";
import { formValueSelector } from 'redux-form';
import VirtualMachineModel from '../../models/virtualMachineModel';
import { State } from '../../store/initialState';
import { toggleLoadingBar } from "../../actions/navActions";

class VirtualMachineProvisionModalContainer extends React.Component {
    props: any;

    async onSubmit(form: VirtualMachineModel) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.provisionVm(this.props.authSession.user.ownerUuid, form.alias, form.nics, form.brand, this.props.packages.selectedPackage, form.image_uuid);
        this.props.actions.toggleLoadingBar(false);
    };

    async componentDidMount() {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.getAllPackages('virtualMachineProvisionModal');
        await this.props.actions.getAllImages('virtualMachineProvisionModal');
        await this.props.actions.getAllFabricNetworksByOwnerId(this.props.authSession.user.ownerUuid);
        this.props.actions.toggleLoadingBar(false);
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
            <fieldset disabled={this.props.isLoading}>
                <VirtualMachineProvisionModal   selectPrimaryNic={this.selectPrimaryNic.bind(this)}
                                                errorMessages={this.props.errorMessages} 
                                                networks={this.props.networks}
                                                packages={this.props.packages}
                                                selectImage={this.selectImage.bind(this)}
                                                images={this.props.images}
                                                showPackageInformation={this.showPackageInformation.bind(this)} 
                                                selectNetworks={this.selectNetworks.bind(this)} 
                                                onSubmit={this.onSubmit.bind(this)} />
            </fieldset>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('virtualMachineProvisionModal');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        authSession: state.authSession,
        packages: state.packages,
        images: state.images,
        networks: state.networks,
        virtualMachineProvision: state.virtualMachineProvision,
        errorMessages: selector(state, "errorMessages"),
        isLoading: selectorLoading(state, 'isLoading')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({provisionVm, getAllPackages, showPackageInformation, getAllFabricNetworksByOwnerId, selectNetworks, selectPrimaryNic, hideProvisionModal, getAllImages, selectImage, toggleLoadingBar}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineProvisionModalContainer);