import React from 'react'
import {connect} from "react-redux";
import {createVm} from "../actions/virtualMachineActions";
import {getAllPackages, showPackageInformation} from "../actions/packagesActions";
import {bindActionCreators} from "redux";
import CreateVirtualMachineForm from "../components/createVirtualMachineForm";
import LoadingSpinner from '../components/loadingSpinner';
import Error from "../components/error";

class CreateVirtualMachineFormValues {
    alias: string;
    package: string;
    image: string;
}

class CreateVirtualMachineFormContainer extends React.Component {
    props: any;

    async onSubmit(values: CreateVirtualMachineFormValues) {
        //await this.props.actions.createVm(this.props.authSession.owner_uuid, values.alias, [], values.package, '7b5981c4-1889-11e7-b4c5-3f3bdfc9b88b', 'lx', '');
    };

    async componentDidMount() {
        await this.props.actions.getAllPackages();
    }

    async showPackageInformation(selectedPackage: any) {
        await this.props.actions.showPackageInformation(this.props.packages.packages, selectedPackage);
    }

    render() {
        return (
            <div>
                {this.props.virtualMachines.isLoading ? <LoadingSpinner/> : null}
                {this.props.virtualMachines.errorMessages.length > 0 ? <Error errors={this.props.virtualMachines.errorMessages}/> : null}
                <CreateVirtualMachineForm packages={this.props.packages} showPackageInformation={this.showPackageInformation.bind(this)} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession,
        virtualMachines: state.virtualMachines,
        packages: state.packages
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createVm, getAllPackages, showPackageInformation}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(CreateVirtualMachineFormContainer);