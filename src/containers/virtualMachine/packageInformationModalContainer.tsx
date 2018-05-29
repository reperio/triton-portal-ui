import React from 'react'
import { connect } from "react-redux";
import { hidePackageInformation, getPackageByUuid } from "../../actions/packagesActions";
import { bindActionCreators } from "redux";
import ImageInformationModal from "../../components/virtualMachine/imageInformationModal";
import { formValueSelector } from 'redux-form';
import LoadingSpinner from '../../components/misc/loadingSpinner';
import { State } from '../../store/initialState';
import PackageInformation from '../../components/virtualMachine/packageInformation';

class PackageInformationModalContainer extends React.Component {
    props: any;

    async componentDidMount() {
        this.props.actions.getPackageByUuid(this.props.row.original.billing_id);
    }

    render() {
        return (
            <div>
                {this.props.package == undefined ? <LoadingSpinner/> 
                    : <PackageInformation   errorMessages={this.props.errorMessages}
                                            data={this.props.package}/> }
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
        actions: bindActionCreators({getPackageByUuid, hidePackageInformation}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(PackageInformationModalContainer);