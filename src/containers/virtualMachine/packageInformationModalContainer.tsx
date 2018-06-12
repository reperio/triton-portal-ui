import React from 'react'
import { connect } from "react-redux";
import { hidePackageInformation, getPackageByUuid } from "../../actions/packagesActions";
import { bindActionCreators } from "redux";
import ImageInformationModal from "../../components/virtualMachine/imageInformationModal";
import { formValueSelector } from 'redux-form';
import { State } from '../../store/initialState';
import PackageInformation from '../../components/virtualMachine/packageInformation';
import { toggleLoadingBar } from "../../actions/navActions";

class PackageInformationModalContainer extends React.Component {
    props: any;

    async componentDidMount() {
        this.props.actions.toggleLoadingBar(true);
        this.props.actions.getPackageByUuid(this.props.row.original.billing_id);
        this.props.actions.toggleLoadingBar(false);
    }

    render() {
        return (
            <div>
                {this.props.package != null ? <PackageInformation errorMessages={this.props.errorMessages} data={this.props.package}/> : null }
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('packageInformation');
    return {
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row'),
        package: selector(state, 'package')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getPackageByUuid, hidePackageInformation, toggleLoadingBar}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(PackageInformationModalContainer);