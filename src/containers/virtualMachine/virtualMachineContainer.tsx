import React from 'react'
import {connect, Dispatch, ReactNode} from "react-redux";
import { bindActionCreators } from "redux";
import { getVmsByOwner, startVm, stopVm, rebootVm, deleteVm, showDeleteModal, hideDeleteModal, showRenameModal, hideRenameModal, showReprovisionModal, hideReprovisionModal, remoteFormSubmit, renameVm, hideResizeModal, showResizeModal, resizeVm, showNicModal, hideNicModal, showCreateModal, hideCreateModal } from "../../actions/virtualMachineActions";
import ReactTable, { RowInfo } from 'react-table';
import LoadingSpinner from '../../components/misc/loadingSpinner';
import { LinkContainer } from "react-router-bootstrap";
import { FormGroup, NavItem, Button } from "react-bootstrap";
import Error from '../../components/misc/error';
import VirtualMachineForm from '../../components/virtualMachine/virtualMachineForm';
import { formValueSelector, Field, submit } from 'redux-form';
import VirtualMachineRenameModal from '../../components/virtualMachine/virtualMachineRenameModal';
import VirtualMachineEditNicsModalContainer from './virtualMachineEditNicsModalContainer';
import VirtualMachineReprovisionModalContainer from './virtualMachineReprovisionModalContainer';
import VirtualMachineResizeModalContainer from './virtualMachineResizeModalContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FlatButton, Dialog } from 'material-ui';
import 'react-table/react-table.css';
import VirtualMachineDeleteModal from '../../components/virtualMachine/virtualMachineDeleteModal';
import VirtualMachineDeleteModalContainer from './virtualMachineDeleteModalContainer';
import VirtualMachineRenameModalContainer from './virtualMachineRenameModalContainer';
import VirtualMachineExtendedDetails from '../../components/virtualMachine/virtualMachineExtendedDetails';
import VirtualMachineActionsButton from '../../components/virtualMachine/virtualMachineActionsButton';
import VirtualMachineCreateModalContainer from './virtualMachineCreateModalContainer';

class VirtualMachineContainer extends React.Component {
    props: any;

    columns: any[] = [
        { Header: 'Name', accessor: 'alias' },
        { Header: 'Ram', accessor: 'ram' },
        { Header: 'State', accessor: 'state'},
        { Header: 'Actions', Cell: (row:any) => (
            <VirtualMachineActionsButton    row={row} 
                                            editNics={this.editNics.bind(this)} 
                                            startVirtualMachine={this.startVirtualMachine.bind(this)}
                                            endVirtualMachine={this.endVirtualMachine.bind(this, row)}
                                            restartVirtualMachine={this.restartVirtualMachine.bind(this)}
                                            renameVirtualMachine={this.renameVirtualMachine.bind(this)}
                                            reprovisionVirtualMachine={this.reprovisionVirtualMachine.bind(this)}
                                            resizeVirtualMachine={this.resizeVirtualMachine.bind(this)}
                                            deleteVirtualMachine={this.deleteVirtualMachine.bind(this)} />
        ) }
    ];

    async componentDidMount() {
        this.refreshTable();
    }

    async remoteVmCreate() {
        await this.props.actions.remoteFormSubmit('virtualMachineCreateModal');
    }

    createVirtualMachine() {
        this.props.actions.showCreateModal();
    }

    hideCreateModal() {
        this.props.actions.hideCreateModal();
    }

    async startVirtualMachine(row:any) {
        await this.props.actions.startVm(this.props.authSession.user.data.ownerUuid, row.original.uuid);
    }

    async endVirtualMachine(row:any) {
        await this.props.actions.stopVm(this.props.authSession.user.data.ownerUuid, row.original.uuid);
    }

    async restartVirtualMachine(row:any) {
        await this.props.actions.rebootVm(this.props.authSession.user.data.ownerUuid, row.original.uuid);
    }

    //delete vm
    async deleteModal() {
        await this.props.actions.deleteVm(this.props.authSession.user.data.ownerUuid, this.props.row.original.uuid);
        this.refreshTable();
    }

    deleteVirtualMachine(row:any) {
        this.props.actions.showDeleteModal(row);
    }

    hideDeleteModal() {
        this.props.actions.hideDeleteModal();
    }

    //rename vm
    async remoteVmRename() {
        await this.props.actions.remoteFormSubmit('virtualMachineRenameModal');
    }

    renameVirtualMachine(row:any) {
        this.props.actions.showRenameModal(row);
    }

    hideRenameModal() {
        this.props.actions.hideRenameModal();
    }

    //reprovision vm
    async remoteVmReprovision() {
        await this.props.actions.remoteFormSubmit('virtualMachineReprovisionModal');
    }

    reprovisionVirtualMachine(row:any) {
        this.props.actions.showReprovisionModal(row);
    }

    hideReprovisionModal() {
        this.props.actions.hideReprovisionModal();
    }

    //resize vm
    async remoteVmResize() {
        await this.props.actions.remoteFormSubmit('virtualMachineResizeModal');
    }

    resizeVirtualMachine(row:any) {
        this.props.actions.showResizeModal(row);
    }

    hideResizeModal() {
        this.props.actions.hideResizeModal();
    }

    //update vm nics
    async remoteNic() {
        await this.props.actions.remoteFormSubmit('virtualMachineEditNicsModal');
    }

    editNics(row: any) {
        this.props.actions.showNicModal(row);
    }

    hideNicModal() {
        this.props.actions.hideNicModal();
    }

    async refreshTable() {
        await this.props.actions.getVmsByOwner(this.props.authSession.user.data.ownerUuid);
    }

    render() {
        return (
            <div>
                {this.props.virtualMachines.isLoading || this.props.virtualMachineActions.isLoading ? <LoadingSpinner/> : null}
                <VirtualMachineForm errorMessages={this.props.errorMessages} />
                {this.props.showingDeleteModal != undefined ?
                    <MuiThemeProvider>
                        <Dialog actions={[    
                            <FlatButton label="Cancel"
                                        primary={true}
                                        onClick={this.hideDeleteModal.bind(this)}/>,
                            <FlatButton label="Yes"
                                        primary={true}
                                        onClick={this.deleteModal.bind(this)}/> ]}
                                title={'Are you sure you want to delete this Virtual Machine?'}
                                modal={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingDeleteModal}>
                                    <VirtualMachineDeleteModalContainer/>
                                </Dialog>
                        </MuiThemeProvider>
                    : null}

                {this.props.showingReprovisionModal != undefined ?
                    <MuiThemeProvider>
                        <Dialog actions={[
                            <FlatButton label="Cancel"
                                        primary={true}
                                        onClick={this.hideReprovisionModal.bind(this)}/>,
                            <FlatButton onClick={this.remoteVmReprovision.bind(this)}
                                        label="Update"
                                        primary={true}
                                        type="submit"/> ]}
                                title={'Repovision Virtual Machine'}
                                modal={true}
                                autoDetectWindowHeight={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingReprovisionModal}>
                            <VirtualMachineReprovisionModalContainer />
                        </Dialog>
                    </MuiThemeProvider>
                : null}

                {this.props.showingResizeModal != undefined ?
                    <MuiThemeProvider>
                        <Dialog actions={[
                            <FlatButton label="Cancel"
                                        primary={true}
                                        onClick={this.hideResizeModal.bind(this)}/>,
                            <FlatButton onClick={this.remoteVmResize.bind(this)}
                                        label="Update"
                                        primary={true}
                                        type="submit"/> ]}
                                title={'Resize Virtual Machine'}
                                modal={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingResizeModal}>
                            <VirtualMachineResizeModalContainer />
                        </Dialog>
                    </MuiThemeProvider>
                : null}

                {this.props.showingRenameModal != undefined ?
                    <MuiThemeProvider>
                        <Dialog actions={[    
                            <FlatButton label="Cancel"
                                        primary={true}
                                        onClick={this.hideRenameModal.bind(this)}/>,
                            <FlatButton label="Update"
                                        primary={true}
                                        onClick={this.remoteVmRename.bind(this)}
                                        type="submit"/> ]}
                                title={'Rename Virtual Machine Alias'}
                                modal={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingRenameModal}> 
                                <VirtualMachineRenameModalContainer/>
                        </Dialog>
                    </MuiThemeProvider>
                : null}

                {this.props.showingNicModal != undefined ?
                    <MuiThemeProvider>
                        <Dialog actions={[    
                            <FlatButton label="Cancel"
                                        primary={true}
                                        onClick={this.hideNicModal.bind(this)}/>,
                            <FlatButton label="Update"
                                        primary={true}
                                        onClick={this.remoteNic.bind(this)}
                                        type="submit"/> ]}
                                title='Edit Nics'
                                modal={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingNicModal}> 
                            <VirtualMachineEditNicsModalContainer />
                        </Dialog>
                    </MuiThemeProvider>
                : null}

                {this.props.showingCreateModal != undefined ?
                    <MuiThemeProvider>
                        <Dialog actions={[    
                            <FlatButton label="Cancel"
                                        primary={true}
                                        onClick={this.hideCreateModal.bind(this)}/>,
                            <FlatButton label="Create"
                                        primary={true}
                                        onClick={this.remoteVmCreate.bind(this)}
                                        type="submit"/> ]}
                                title='Create a virtual machine'
                                modal={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingCreateModal}> 
                            <VirtualMachineCreateModalContainer />
                        </Dialog>
                    </MuiThemeProvider>
                : null}

                <FormGroup>
                    <Button bsStyle="primary" onClick={this.createVirtualMachine.bind(this)}>Create a virtual machine <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></Button>
                </FormGroup>
                
                <FormGroup>
                    <Button onClick={this.refreshTable.bind(this)} bsStyle="default">
                        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                    </Button>
                </FormGroup>
                
                <ReactTable data={this.props.virtualMachines.vms} 
                            columns={this.columns}
                            className="-striped -highlight"
                            SubComponent={(row: RowInfo) => {
                                return(
                                    <div className="nested-table-container">
                                        <VirtualMachineExtendedDetails data={row.original} />
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
        errorMessages: selector(state, 'errorMessages'),
        showingDeleteModal: selector(state, 'showingDeleteModal'),
        showingRenameModal: selector(state, 'showingRenameModal'),
        showingReprovisionModal: selector(state, 'showingReprovisionModal'),
        showingResizeModal: selector(state, 'showingResizeModal'),
        showingNicModal: selector(state, 'showingNicModal'),
        showingCreateModal: selector(state, 'showingCreateModal'),
        row: selector(state, 'row')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({
            getVmsByOwner,
            startVm, 
            stopVm, 
            deleteVm, 
            rebootVm, 
            showDeleteModal, 
            hideDeleteModal, 
            showRenameModal, 
            hideRenameModal, 
            showReprovisionModal, 
            remoteFormSubmit, 
            renameVm, 
            hideReprovisionModal, 
            hideResizeModal, 
            showResizeModal,
            resizeVm,
            showNicModal,
            hideNicModal,
            showCreateModal,
            hideCreateModal
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineContainer);