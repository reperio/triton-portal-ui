import React from 'react'
import { connect } from "react-redux";
import { resizeVm, hideResizeModal, selectPackage } from "../../actions/virtualMachineActions";
import { getAllPackages } from "../../actions/packagesActions";
import { toggleLoadingBar } from "../../actions/navActions";
import { bindActionCreators } from "redux";
import VirtualMachineResizeModal from "../../components/virtualMachine/virtualMachineResizeModal";
import { formValueSelector } from 'redux-form';

class VirtualMachineResizeModalContainer extends React.Component {
    props: any;

    async componentDidMount() {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.getAllPackages('virtualMachineResizeModal');
        this.props.actions.toggleLoadingBar(false);
    }

    async closeResizeModal() {
        await this.props.actions.hideResizeModal();
    }

    async resizeModal(form: any) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.resizeVm(this.props.authSession.user.data.ownerUuid, this.props.row.original.uuid, form.selectedPackage);
        this.props.actions.toggleLoadingBar(false);
    }

    async selectPackage(e: any) {
        await this.props.actions.selectPackage(e.target.value);
    }

    render() {
        return (
            <fieldset disabled={this.props.isLoading}>
                <VirtualMachineResizeModal  selectPackage={this.selectPackage.bind(this)} 
                                            close={this.closeResizeModal.bind(this)} 
                                            onSubmit={this.resizeModal.bind(this)}
                                            errorMessages={this.props.errorMessages}
                                            initialValues={{package: this.props.row.original.billing_id, packages: this.props.packages.packages}} />
            </fieldset>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineResizeModal');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        authSession: state.authSession,
        packages: state.packages,
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row'),
        isLoading: selectorLoading(state, 'isLoading')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getAllPackages, resizeVm, hideResizeModal, selectPackage, toggleLoadingBar}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineResizeModalContainer);