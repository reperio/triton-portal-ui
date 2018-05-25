import React from 'react'
import { connect } from "react-redux";
import { resizeVm, hideResizeModal, selectPackage } from "../../actions/virtualMachineActions";
import { getAllPackages } from "../../actions/packagesActions";
import { bindActionCreators } from "redux";
import VirtualMachineResizeModal from "../../components/virtualMachine/virtualMachineResizeModal";
import { formValueSelector } from 'redux-form';
import LoadingSpinner from '../../components/misc/loadingSpinner';

class VirtualMachineResizeModalContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getAllPackages('virtualMachineResizeModal');
    }

    async closeResizeModal() {
        await this.props.actions.hideResizeModal();
    }

    async resizeModal(form: any) {
        await this.props.actions.resizeVm(this.props.authSession.user.data.ownerUuid, this.props.row.original.uuid, form.selectedPackage.uuid);
    }

    async selectPackage(selectedPackage: any) {
        await this.props.actions.selectPackage(selectedPackage);
    }

    render() {
        return (
            <div>
                {this.props.packages.isLoading ? <LoadingSpinner/> : null}
                <VirtualMachineResizeModal  selectPackage={this.selectPackage.bind(this)} 
                                            close={this.closeResizeModal.bind(this)} 
                                            onSubmit={this.resizeModal.bind(this)}
                                            errorMessages={this.props.errorMessages}
                                            initialValues={{billing_id: this.props.row.original.billing_id, packages: this.props.packages.packages}} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineResizeModal');
    return {
        authSession: state.authSession,
        packages: state.packages,
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getAllPackages, resizeVm, hideResizeModal, selectPackage}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineResizeModalContainer);