import React from 'react'
import { connect } from "react-redux";
import { hideRenameModal, renameVm } from "../../actions/virtualMachineActions";
import { bindActionCreators } from "redux";
import VirtualMachineRenameModal from "../../components/virtualMachine/virtualMachineRenameModal";
import { formValueSelector } from 'redux-form';
import { toggleLoadingBar } from "../../actions/navActions";
import { State } from '../../store/initialState';

class VirtualMachineRenameModalContainer extends React.Component {
    props: any;

    async renameModal(form: any) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.renameVm(this.props.authSession.user.ownerUuid, this.props.row.original.uuid, form.alias);
        this.props.actions.toggleLoadingBar(false);
    }

    hideRenameModal() {
        this.props.actions.hideRenameModal();
    }

    render() {
        return (
            <fieldset disabled={this.props.isLoading}>
                <VirtualMachineRenameModal  errorMessages={this.props.errorMessages} 
                                            close={this.hideRenameModal.bind(this)} 
                                            onSubmit={this.renameModal.bind(this)}
                                            initialValues={{alias: this.props.row.original.alias}} />
            </fieldset>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineRenameModal');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        authSession: state.authSession,
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row'),
        isLoading: selectorLoading(state, 'isLoading')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({renameVm, hideRenameModal, toggleLoadingBar}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineRenameModalContainer);