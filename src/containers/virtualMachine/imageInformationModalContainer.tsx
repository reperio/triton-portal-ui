import React from 'react'
import { connect } from "react-redux";
import { hideImageInformation, getImageByUuid } from "../../actions/imageActions";
import { bindActionCreators } from "redux";
import ImageInformationModal from "../../components/virtualMachine/imageInformationModal";
import { formValueSelector } from 'redux-form';
import LoadingSpinner from '../../components/misc/loadingSpinner';

class ImageInformationModalContainer extends React.Component {
    props: any;

    async componentDidMount() {
        this.props.actions.getImageByUuid(this.props.row.original.image_uuid);
    }

    hideRenameModal() {
        this.props.actions.hideRenameModal();
    }

    render() {
        return (
            <div>
                {this.props.image == undefined ? <LoadingSpinner/> 
                    : <ImageInformationModal    errorMessages={this.props.errorMessages}
                                                data={this.props.image} 
                                                close={this.hideRenameModal.bind(this)} /> }
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('imageInformationModal');
    return {
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row'),
        image: selector(state, 'image')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getImageByUuid, hideImageInformation}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ImageInformationModalContainer);