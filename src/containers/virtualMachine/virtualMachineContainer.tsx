import React from 'react'
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import { getVmsByOwner, getAllVms, startVm, stopVm, rebootVm, deleteVm } from "../../actions/virtualMachineActions";
import { navigateToVirtualMachineEdit } from '../../actions/virtualMachineActions';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import LoadingSpinner from '../../components/misc/loadingSpinner';
import {FormGroup} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {NavItem} from "react-bootstrap";
import Error from '../../components/misc/error';
import VirtualMachineForm from '../../components/virtualMachine/virtualMachineForm';
import { formValueSelector } from 'redux-form';

class VirtualMachineContainer extends React.Component {
    props: any;
    data: any[];

    columns: any[] = [
        { Header: 'Name', accessor: 'alias' },
        { Header: 'Ram', accessor: 'ram' },
        { Header: 'State', accessor: 'state'}
    ];

    async componentDidMount() {
        await this.props.actions.getVmsByOwner(this.props.authSession.user.data.ownerUuid);
    }

    async startVirtualMachine(row:any) {
        await this.props.actions.startVm(this.props.authSession.user.data.ownerUuid, row.original.uuid);
        await this.componentDidMount();
    }

    async endVirtualMachine(row:any) {
        await this.props.actions.stopVm(this.props.authSession.user.data.ownerUuid, row.original.uuid);
        await this.componentDidMount();
    }

    async restartVirtualMachine(row:any) {
        await this.props.actions.rebootVm(this.props.authSession.user.data.ownerUuid, row.original.uuid);
        await this.componentDidMount();
    }

    async deleteVirtualMachine(row:any) {
        await this.props.actions.deleteVm(this.props.authSession.user.data.ownerUuid, row.original.uuid);
        await this.componentDidMount();
    }

    async editVirtualMachine(row: any) {
        await this.props.actions.navigateToVirtualMachineEdit(row.original);
    }

    render() {
        return (
            <div>
                {this.props.virtualMachines.isLoading || this.props.virtualMachineActions.isLoading || this.props.virtualMachineEdit.isLoading ? <LoadingSpinner/> : null}
                <VirtualMachineForm errorMessages={this.props.errorMessages} />
                <FormGroup>
                    <LinkContainer to="/create-virtual-machine"><NavItem>Create a virtual machine</NavItem></LinkContainer>
                </FormGroup>
                <ReactTable 
                    data={this.props.virtualMachines.vms} 
                    columns={this.columns}
                    className="-striped -highlight"
                    SubComponent={row => {
                        return(
                            <div>
                                <button onClick={this.startVirtualMachine.bind(this, row)} className="btn btn-success vm-actions"><span className="glyphicon glyphicon-play" aria-hidden="true"></span></button>
                                <button onClick={this.endVirtualMachine.bind(this, row)} className="btn btn-warning vm-actions"><span className="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
                                <button onClick={this.restartVirtualMachine.bind(this, row)} className="btn btn-info vm-actions"><span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>
                                {row.original.brand.toLowerCase() === "lx" || row.original.brand.toLowerCase() === "os"}<button onClick={this.editVirtualMachine.bind(this, row)} className="btn btn-default vm-actions"><span className="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
                                <button onClick={this.deleteVirtualMachine.bind(this, row)} className="btn btn-danger vm-actions"><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                            </div>
                        );
                    }}/>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('virtualMachineForm');
    return {
        authSession: state.authSession,
        virtualMachines: state.virtualMachines,
        virtualMachineActions: state.virtualMachineActions,
        virtualMachineEdit: state.virtualMachineEdit,
        errorMessages: selector(state, 'errorMessages')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getVmsByOwner, getAllVms, startVm, stopVm, deleteVm, rebootVm, navigateToVirtualMachineEdit}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineContainer);