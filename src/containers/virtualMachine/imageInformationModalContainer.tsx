import React from 'react'
import { connect } from "react-redux";
import { hideImageInformation, getImageByUuid } from "../../actions/imageActions";
import { bindActionCreators } from "redux";
import ImageInformationModal from "../../components/virtualMachine/imageInformationModal";
import { formValueSelector } from 'redux-form';
import { State } from '../../store/initialState';
import { toggleLoadingBar } from "../../actions/navActions";

class ImageInformationModalContainer extends React.Component {
    props: any;

    async componentDidMount() {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.getImageByUuid(this.props.row.original.image_uuid);
        this.props.actions.toggleLoadingBar(false);
    }

    render() {
        return (
            <div>
                {this.props.image != null ? <ImageInformationModal errorMessages={this.props.errorMessages} data={this.props.image}/> : null }
            </div>
        );
    }
}

function mapStateToProps(state: State) {
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
        actions: bindActionCreators({getImageByUuid, hideImageInformation, toggleLoadingBar}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ImageInformationModalContainer);