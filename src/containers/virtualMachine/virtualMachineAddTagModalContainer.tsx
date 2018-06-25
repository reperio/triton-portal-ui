import React from 'react'
import { connect } from "react-redux";
import { hideAddTagModal, showAddTagModal, addTag } from "../../actions/virtualMachineActions";
import { bindActionCreators } from "redux";
import { formValueSelector } from 'redux-form';
import { toggleLoadingBar } from "../../actions/navActions";
import { State } from '../../store/initialState';
import VirtualMachineAddTagModal from '../../components/virtualMachine/virtualMachineAddTagModal';

class VirtualMachineAddTagModalContainer extends React.Component {
    props: any;

    async addTags(form: any) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.addTag(this.props.selectedVirtualMachines, form.name, form.value, this.props.authSession.user.ownerUuid, null);
        this.props.actions.toggleLoadingBar(false);
    }

    render() {
        return (
            <fieldset disabled={this.props.isLoading}>
                <VirtualMachineAddTagModal  onSubmit={this.addTags.bind(this)}
                                            errorMessages={this.props.errorMessages} />
            </fieldset>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineAddTagModal');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        authSession: state.authSession,
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row'),
        isLoading: selectorLoading(state, 'isLoading'),
        selectedVirtualMachines: selector(state, 'selectedVirtualMachines'),
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({showAddTagModal, hideAddTagModal, toggleLoadingBar, addTag}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineAddTagModalContainer);