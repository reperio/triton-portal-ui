import React from 'react'
import { connect } from "react-redux";
import { editVm } from "../../actions/virtualMachineActions";
import { getAllPackages, showPackageInformation} from "../../actions/packagesActions";
import { bindActionCreators } from "redux";
import VirtualMachineEditForm from "../../components/virtualMachine/virtualMachineEditForm";
import LoadingSpinner from '../../components/misc/loadingSpinner';
import Error from "../../components/misc/error";
import { Redirect } from "react-router";
import { formValueSelector } from 'redux-form';
import VirtualMachineEditModel from '../../models/virtualMachineEditModel';

class VirtualMachineEditFormContainer extends React.Component {
    props: any;

    async onSubmit(form: VirtualMachineEditModel) {
        await this.props.actions.editVm(this.props.authSession.user.data.ownerUuid, form.selectedVm.uuid, form.alias, form.image, this.props.selectedPackage);
    };

    async showPackageInformation(selectedPackage: any) {
        await this.props.actions.showPackageInformation(selectedPackage);
    }

    render() {
        return (
            <div>
                {this.props.selectedVm != null && this.props.selectedPackage != null ? 
                <div>
                    {this.props.virtualMachineEdit.isLoading ? <LoadingSpinner/> : null}
                    <VirtualMachineEditForm
                        errorMessages={this.props.errorMessages}
                        selectedPackage={this.props.selectedPackage}
                        initialValues={{
                            packages: this.props.packages,
                            selectedVm: this.props.selectedVm,
                            alias: this.props.selectedVm.alias, 
                            image: this.props.selectedVm.image_uuid}}
                        showPackageInformation={this.showPackageInformation.bind(this)}  
                        onSubmit={this.onSubmit.bind(this)} /> 
                </div> : <Redirect to='/virtual-machines' />}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('virtualMachineEditForm');
    const packageInformationSelector = formValueSelector('packageInformation');
    return {
        authSession: state.authSession,
        virtualMachineEdit: state.virtualMachineEdit,
        packages: selector(state, 'packages'),
        errorMessages: selector(state, 'errorMessages'),
        selectedPackage: packageInformationSelector(state, 'selectedPackage'),
        selectedVm: selector(state, 'selectedVm')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editVm, getAllPackages, showPackageInformation}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineEditFormContainer);