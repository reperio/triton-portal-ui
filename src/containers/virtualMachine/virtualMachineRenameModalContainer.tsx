import React from 'react'
import { connect } from "react-redux";
import { hideRenameModal, renameVm } from "../../actions/virtualMachineActions";
import { bindActionCreators } from "redux";
import VirtualMachineRenameModal from "../../components/virtualMachine/virtualMachineRenameModal";
import { formValueSelector } from 'redux-form';
import LoadingSpinner from '../../components/misc/loadingSpinner';

class VirtualMachineRenameModalContainer extends React.Component {
    props: any;

    async renameModal(form: any) {
        await this.props.actions.renameVm(this.props.authSession.user.data.ownerUuid, this.props.row.original.uuid, form.alias);
    }

    hideRenameModal() {
        this.props.actions.hideRenameModal();
    }

    render() {
        return (
            <div>
                <VirtualMachineRenameModal  errorMessages={this.props.errorMessages} 
                                            close={this.hideRenameModal.bind(this)} 
                                            onSubmit={this.renameModal.bind(this)}
                                            initialValues={{alias: this.props.row.original.alias}} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineRenameModal');
    return {
        authSession: state.authSession,
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({renameVm, hideRenameModal}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineRenameModalContainer);