import React from 'react'
import { connect } from "react-redux";
import { createVm, selectPrimaryNic, hideCreateModal } from "../../actions/virtualMachineActions";
import { getAllPackages, showPackageInformation } from "../../actions/packagesActions";
import { getAllImages, selectImage } from "../../actions/imageActions";
import { getAllFabricNetworksByOwnerId, selectNetworks } from "../../actions/networkActions";
import { bindActionCreators } from "redux";
import VirtualMachineCreateModal from "../../components/virtualMachine/virtualMachineCreateModal";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import Error from "../../components/misc/error";
import { formValueSelector } from 'redux-form';
import VirtualMachineModel from '../../models/virtualMachineModel';
import { State } from '../../store/initialState';

class VirtualMachineCreateModalContainer extends React.Component {
    props: any;

    async onSubmit(form: VirtualMachineModel) {
        await this.props.actions.createVm(this.props.authSession.user.data.ownerUuid, form.alias, form.nics, form.brand, this.props.packages.selectedPackage, form.image_uuid);
    };

    async componentDidMount() {
        await this.props.actions.getAllPackages('virtualMachineCreateModal');
        await this.props.actions.getAllImages('virtualMachineCreateModal');
        await this.props.actions.getAllFabricNetworksByOwnerId(this.props.authSession.user.data.ownerUuid);
    }

    async showPackageInformation(e: any) {
        await this.props.actions.showPackageInformation(e.target.value, this.props.packages.packages);
    }

    async selectNetworks(selectedNetworks: any[]) {
        await this.props.actions.selectNetworks(selectedNetworks);
    }

    selectImage(e: any) {
        this.props.actions.selectImage('virtualMachineCreateModal', e.target.value, this.props.images.images);
    }

    async selectPrimaryNic(nicIndex: number) {
        await this.props.actions.selectPrimaryNic(nicIndex, 'virtualMachineCreateModal');
    }

    async closeCreateModal() {
        await this.props.actions.hideCreateModal();
    }

    render() {
        return (
            <div>
                {this.props.packages.isLoading || this.props.networks.isLoading || this.props.images.isLoading || this.props.virtualMachineCreate.isLoading ? <LoadingSpinner/> : null}
                <VirtualMachineCreateModal  selectPrimaryNic={this.selectPrimaryNic.bind(this)}
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
    const selector = formValueSelector('virtualMachineCreateModal');
    return {
        authSession: state.authSession,
        packages: state.packages,
        images: state.images,
        networks: state.networks,
        virtualMachineCreate: state.virtualMachineCreate,
        errorMessages: selector(state, "errorMessages")
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createVm, getAllPackages, showPackageInformation, getAllFabricNetworksByOwnerId, selectNetworks, selectPrimaryNic, hideCreateModal, getAllImages, selectImage}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineCreateModalContainer);