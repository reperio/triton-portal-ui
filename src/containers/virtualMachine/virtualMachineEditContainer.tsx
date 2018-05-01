import React from 'react'
import { connect } from "react-redux";
import { editVm } from "../../actions/virtualMachineEditActions";
import { getAllPackages, showPackageInformation} from "../../actions/packagesActions";
import { bindActionCreators } from "redux";
import VirtualMachineEditForm from "../../components/virtualMachine/virtualMachineEditForm";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import Error from "../../components/misc/error";
import { Redirect } from "react-router";
import { formValueSelector } from 'redux-form';

class VirtualMachineEditFormContainer extends React.Component {
    props: any;

    async onSubmit() {
        await this.props.actions.editVm(this.props.authSession.user.data.ownerUuid, this.props.virtualMachineEdit.selectedVm.uuid, this.props.packages.selectedPackage);
    };

    async componentDidMount() {
        await this.props.actions.getAllPackages();
        await this.showPackageInformation(this.props.virtualMachineEdit.selectedVm);
    }

    async showPackageInformation(selectedPackage: any) {
        await this.props.actions.showPackageInformation(this.props.packages.packages, selectedPackage);
    }

    render() {
        return (
            <div>
                {this.props.virtualMachineEdit.selectedVm !== null ? 
                <div>
                    {this.props.virtualMachineEdit.isLoading || !this.props.packages.hasLoaded ? <LoadingSpinner/> : null}
                    {this.props.packages.hasLoaded && this.props.packages.showInformation
                        ? <VirtualMachineEditForm errorMessages={this.props.errorMessages} selectedVm={this.props.virtualMachineEdit.selectedVm} packages={this.props.packages} showPackageInformation={this.showPackageInformation.bind(this)}  onSubmit={this.onSubmit.bind(this)} /> 
                        : null}
                </div> : <Redirect to="/virtual-machines"/>}

            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('virtualMachineEditForm');
    return {
        authSession: state.authSession,
        virtualMachineEdit: state.virtualMachineEdit,
        packages: state.packages,
        errorMessages: selector(state, 'errorMessages')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editVm, getAllPackages, showPackageInformation}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineEditFormContainer);