import React from 'react'
import { connect } from "react-redux";
import { formValueSelector } from 'redux-form';
import { bindActionCreators } from "redux";
import Footer from "../../components/footer/footer";
import { State } from '../../store/initialState';
import ModalWindow from '../../components/misc/modalWindow';
import VirtualMachineAddTagModalContainer from '../virtualMachine/virtualMachineAddTagModalContainer';
import { showAddTagModal, hideAddTagModal, remoteFormSubmit, clearSelectedVirtualMachines } from '../../actions/virtualMachineActions';

class FooterContainer extends React.Component {
    props: any;

    async componentDidMount() {
    }

    hideAddTagModal() {
        this.props.actions.hideAddTagModal();
    }

    remoteAddTag() {
        this.props.actions.remoteFormSubmit('virtualMachineAddTagModal');
    }

    showAddTagModal() {
        this.props.actions.showAddTagModal();
    }

    clearSelectedVirtualMachines() {
        this.props.actions.clearSelectedVirtualMachines();
    }

    render() {
        return (
            <div>
                <Footer selectedVirtualMachines={this.props.selectedVirtualMachines} 
                        showAddTagModal={this.showAddTagModal.bind(this)}
                        clearSelectedVirtualMachines={this.clearSelectedVirtualMachines.bind(this)}/>                
                <ModalWindow    open={this.props.showingAddTagModal} 
                                title={'Add Tags to Virtual Machines'}
                                close={this.hideAddTagModal.bind(this)}
                                actions={[
                                    <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.hideAddTagModal.bind(this)}>Cancel</button>,
                                    <button className="reperio-form-control reperio-btn reperio-success" onClick={this.remoteAddTag.bind(this)}>Add</button>]}>
                    <VirtualMachineAddTagModalContainer />
                </ModalWindow>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('virtualMachineForm');
    return {
        selectedVirtualMachines: selector(state, 'selectedVirtualMachines'),
        showingAddTagModal: selector(state, 'showingAddTagModal')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({showAddTagModal, hideAddTagModal, remoteFormSubmit, clearSelectedVirtualMachines}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(FooterContainer);