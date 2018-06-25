import React from 'react'
import { connect } from "react-redux";
import { hideEditTagsModal, editTags } from "../../actions/virtualMachineActions";
import { bindActionCreators } from "redux";
import VirtualMachineEditTagsModal from "../../components/virtualMachine/virtualMachineEditTagsModal";
import { formValueSelector } from 'redux-form';
import { toggleLoadingBar } from "../../actions/navActions";
import { State } from '../../store/initialState';

class VirtualMachineEditTagsModalContainer extends React.Component {
    props: any;

    async closeEditTagsModal() {
        await this.props.actions.hideEditTagsModal();
    }

    async editTags(form: any) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.editTags(form.tags, this.props.row.original.uuid, this.props.authSession.user.ownerUuid, null);
        this.props.actions.toggleLoadingBar(false);
    }

    render() {
        return (
            <fieldset disabled={this.props.isLoading}>
                <VirtualMachineEditTagsModal    close={this.closeEditTagsModal.bind(this)} 
                                                onSubmit={this.editTags.bind(this)}
                                                initialValues={
                                                    {
                                                        tags: Object.keys(this.props.row.original.tags)
                                                                .map((tag: any) => {
                                                                    return {name: tag, value: this.props.row.original.tags[tag]};
                                                                })
                                                    }
                                                }
                                                errorMessages={this.props.errorMessages}/>
            </fieldset>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineEditTagsModal');
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
        actions: bindActionCreators({ hideEditTagsModal, toggleLoadingBar, editTags}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineEditTagsModalContainer);