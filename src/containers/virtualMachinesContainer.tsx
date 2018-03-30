import React from 'react'
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import {getVmsByOwner, getAllVms, startVm} from "../actions/virtualMachineActions";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import LoadingSpinner from '../components/loadingSpinner';
import {FormGroup} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {NavItem} from "react-bootstrap";
import Error from '../components/error';

class VirtualMachinesContainer extends React.Component {
    props: any;
    data: any[];

    columns: any[] = [
        { Header: 'Name', accessor: 'alias' },
        { Header: 'Ram', accessor: 'ram' }
    ];

    async componentDidMount() {
        await this.props.actions.getVmsByOwner(this.props.authSession.user.data.ownerUuid);
    }

    async startVirtualMachine(row:any) {
        await this.props.actions.startVm(this.props.authSession.user.data.ownerUuid, row.uuid);
    }

    async endVirtualMachine(row:any) {
        await this.props.actions.endVm(this.props.authSession.user.data.ownerUuid, row.uuid);
    }

    async restartVirtualMachine(row:any) {
        await this.props.actions.rebootVm(this.props.authSession.user.data.ownerUuid, row.uuid);
    }

    async deleteVirtualMachine(row:any) {
        await this.props.actions.deleteVm(this.props.authSession.user.data.ownerUuid, row.uuid);
    }

    render() {
        return (
            <div>
                {this.props.virtualMachines.isLoading || this.props.virtualMachinesActions.isLoading ? <LoadingSpinner/> : null}
                {this.props.virtualMachines.errorMessages.length || this.props.virtualMachinesActions.errorMessages.length > 0 ? <Error errors={this.props.virtualMachines.errorMessages.concat(this.props.virtualMachinesActions.errorMessages)}/> : null}
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
                                <button onClick={this.startVirtualMachine.bind(this, row.original)} className="btn btn-success vm-actions"><span className="glyphicon glyphicon-play" aria-hidden="true"></span></button>
                                <button onClick={this.endVirtualMachine.bind(this, row.original)} className="btn btn-warning vm-actions"><span className="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
                                <button onClick={this.restartVirtualMachine.bind(this, row.original)} className="btn btn-info vm-actions"><span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>
                                <button onClick={this.deleteVirtualMachine.bind(this, row.original)} className="btn btn-danger vm-actions"><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                            </div>
                        );
                    }}/>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession,
        virtualMachines: state.virtualMachines,
        virtualMachinesActions: state.virtualMachinesActions
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getVmsByOwner, getAllVms, startVm}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachinesContainer);