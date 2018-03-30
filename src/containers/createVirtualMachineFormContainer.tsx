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
    image: string;
    brand: string;
}

class CreateVirtualMachineFormContainer extends React.Component {
    props: any;

    async onSubmit(values: CreateVirtualMachineFormValues) {
        await this.props.actions.createVm(this.props.authSession.user.data.ownerUuid, values.alias, [], values.brand, this.props.packages.selectedPackage.uuid, values.image);
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
                {this.props.createVirtualMachine.isLoading ? <LoadingSpinner/> : null}
                {this.props.createVirtualMachine.errorMessages.length > 0 ? <Error errors={this.props.createVirtualMachine.errorMessages}/> : null}
                <CreateVirtualMachineForm packages={this.props.packages} showPackageInformation={this.showPackageInformation.bind(this)} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession,
        createVirtualMachine: state.createVirtualMachine,
        packages: state.packages
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createVm, getAllPackages, showPackageInformation}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(CreateVirtualMachineFormContainer);