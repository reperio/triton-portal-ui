import React from 'react'
import { connect } from "react-redux";
import { selectImage, reprovisionVm, hideReprovisionModal } from "../../actions/virtualMachineActions";
import { getAllImages } from "../../actions/imageActions";
import { bindActionCreators } from "redux";
import VirtualMachineReprovisionModal from "../../components/virtualMachine/virtualMachineReprovisionModal";
import { formValueSelector } from 'redux-form';
import LoadingSpinner from '../../components/misc/loadingSpinner';

class VirtualMachineReprovisionModalContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getAllImages('virtualMachineReprovisionModal');
    }

    async closeReprovisionModal() {
        await this.props.actions.hideReprovisionModal();
    }

    async reprovisionModal(form: any) {
        await this.props.actions.reprovisionVm(this.props.authSession.user.data.ownerUuid, this.props.row.original.uuid, form.selectedImage.uuid);
    }

    async selectImage(selectedImage: any) {
        await this.props.actions.selectImage('virtualMachineReprovisionModal', selectedImage);
    }

    render() {
        return (
            <div>
                {this.props.images.isLoading ? <LoadingSpinner/>: null}
                <VirtualMachineReprovisionModal selectImage={this.selectImage.bind(this)} 
                                                close={this.closeReprovisionModal.bind(this)} 
                                                onSubmit={this.reprovisionModal.bind(this)} 
                                                initialValues={{image_uuid: this.props.row.original.image_uuid, images: this.props.images.images}}
                                                errorMessages={this.props.errorMessages}/>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineReprovisionModal');
    return {
        authSession: state.authSession,
        images: state.images,
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({selectImage, getAllImages, reprovisionVm, hideReprovisionModal}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineReprovisionModalContainer);