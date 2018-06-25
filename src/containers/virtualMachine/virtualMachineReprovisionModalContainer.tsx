import React from 'react'
import { connect } from "react-redux";
import { selectImage, reprovisionVm, hideReprovisionModal } from "../../actions/virtualMachineActions";
import { getAllImages } from "../../actions/imageActions";
import { bindActionCreators } from "redux";
import VirtualMachineReprovisionModal from "../../components/virtualMachine/virtualMachineReprovisionModal";
import { formValueSelector } from 'redux-form';
import { toggleLoadingBar } from "../../actions/navActions";
import { State } from '../../store/initialState';

class VirtualMachineReprovisionModalContainer extends React.Component {
    props: any;

    async componentDidMount() {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.getAllImages('virtualMachineReprovisionModal');
        this.props.actions.toggleLoadingBar(false);
    }

    async closeReprovisionModal() {
        await this.props.actions.hideReprovisionModal();
    }

    async reprovisionModal(form: any) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.reprovisionVm(this.props.authSession.user.ownerUuid, this.props.row.original.uuid, form.selectedImage);
        this.props.actions.toggleLoadingBar(false);
    }

    async selectImage(e: any) {
        await this.props.actions.selectImage('virtualMachineReprovisionModal', e.target.value);
    }

    render() {
        return (
            <fieldset disabled={this.props.isLoading}>
                <VirtualMachineReprovisionModal selectImage={this.selectImage.bind(this)} 
                                                close={this.closeReprovisionModal.bind(this)} 
                                                onSubmit={this.reprovisionModal.bind(this)} 
                                                initialValues={{image: this.props.row.original.image_uuid, images: this.props.images.images}}
                                                errorMessages={this.props.errorMessages}/>
            </fieldset>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineReprovisionModal');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        authSession: state.authSession,
        images: state.images,
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row'),
        isLoading: selectorLoading(state, 'isLoading')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({selectImage, getAllImages, reprovisionVm, hideReprovisionModal, toggleLoadingBar}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineReprovisionModalContainer);