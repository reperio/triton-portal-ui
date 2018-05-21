import React from 'react'
import {connect, Dispatch} from "react-redux";
import { bindActionCreators } from "redux";
import { getVmsByOwner, startVm, stopVm, rebootVm, deleteVm, showDeleteModal, hideDeleteModal, showRenameModal, hideRenameModal, showReprovisionModal, hideReprovisionModal, remoteFormSubmit, renameVm, hideResizeModal, showResizeModal, resizeVm, showNicModal, hideNicModal } from "../../actions/virtualMachineActions";
import { getAllImages } from '../../actions/imageActions';
import ReactTable from 'react-table';
import LoadingSpinner from '../../components/misc/loadingSpinner';
import { LinkContainer } from "react-router-bootstrap";
import { FormGroup, NavItem, DropdownButton, MenuItem, ButtonToolbar, Glyphicon, Dropdown, Button } from "react-bootstrap";
import Error from '../../components/misc/error';
import VirtualMachineForm from '../../components/virtualMachine/virtualMachineForm';
import { formValueSelector, Field, submit } from 'redux-form';
import VirtualMachineRenameModal from '../../components/virtualMachine/virtualMachineRenameModal';
import VirtualMachineEditNicsModalContainer from '../../containers/virtualMachine/virtualMachineEditNicsModalContainer';
import VirtualMachineReprovisionModalContainer from '../../containers/virtualMachine/virtualMachineReprovisionModalContainer';
import VirtualMachineResizeModalContainer from '../../containers/virtualMachine/virtualMachineResizeModalContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FlatButton, Dialog } from 'material-ui';
import 'react-table/react-table.css';

class VirtualMachineContainer extends React.Component {
    props: any;

    columns: any[] = [
        { Header: 'Name', accessor: 'alias' },
        { Header: 'Ram', accessor: 'ram' },
        { Header: 'State', accessor: 'state'}
    ];

    async componentDidMount() {
        this.refreshTable();
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

    async deleteVirtualMachine(row:any) {
        await this.props.actions.showDeleteModal(row);
    }

    async renameVirtualMachine(row:any) {
        await this.props.actions.showRenameModal(row);
    }

    async reprovisionVirtualMachine(row:any) {
        await this.props.actions.showReprovisionModal(row);
    }

    async resizeVirtualMachine(row:any) {
        await this.props.actions.showResizeModal(row);
    }

    hideRenameModal() {
        this.props.actions.hideRenameModal();
    }

    async renameModal(form: any) {
        await this.props.actions.renameVm(this.props.row.original.uuid, form.alias);
        this.refreshTable();
    }

    hideDeleteModal() {
        this.props.actions.hideDeleteModal();
    }

    async resizeModal() {
        await this.props.actions.resizeVm(this.props.authSession.user.data.ownerUuid, this.props.row.original.uuid);
        this.refreshTable();
    }
    
    async remoteVmRename() {
        await this.props.actions.remoteFormSubmit('virtualMachineRenameModal');
    }

    async remoteVmReprovision() {
        await this.props.actions.remoteFormSubmit('virtualMachineReprovisionModal');
    }

    hideReprovisionModal() {
        this.props.actions.hideReprovisionModal();
    }

    async remoteVmResize() {
        await this.props.actions.remoteFormSubmit('virtualMachineResizeModal');
    }

    hideResizeModal() {
        this.props.actions.hideResizeModal();
    }

    async deleteModal() {
        await this.props.actions.deleteVm(this.props.authSession.user.data.ownerUuid, this.props.row.original.uuid);
        this.refreshTable();
    }

    editNics(row: any) {
        this.props.actions.showNicModal(row);
    }

    async remoteNic() {
        await this.props.actions.remoteFormSubmit('virtualMachineEditNicsModal');
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
                            <FlatButton label="No"
                                        primary={true}
                                        onClick={this.hideDeleteModal.bind(this)}/>,
                            <FlatButton label="Yes"
                                        primary={true}
                                        onClick={this.deleteModal.bind(this)}/> ]}
                                title={'Are you sure you want to delete this Virtual Machine?'}
                                modal={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingDeleteModal}/>
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
                            <VirtualMachineRenameModal  errorMessages={this.props.errorMessages} 
                                                        onSubmit={this.renameModal.bind(this)} 
                                                        initialValues={{alias: this.props.row.original.alias}} />
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

                <FormGroup>
                    <LinkContainer  to="/create-virtual-machine">
                        <Button bsStyle="primary">Create a virtual machine <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></Button>
                    </LinkContainer>
                </FormGroup>
                
                <FormGroup>
                    <Button onClick={this.refreshTable.bind(this)} bsStyle="default">
                        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                    </Button>
                </FormGroup>
                
                <ReactTable data={this.props.virtualMachines.vms} 
                            columns={this.columns}
                            className="-striped -highlight"
                            SubComponent={row => {
                                return(
                                    <div className="nested-button-toolbar">
                                        <ButtonToolbar>
                                            {row.original.state.toLowerCase() === "stopped" ? 
                                                <Button onClick={this.startVirtualMachine.bind(this, row)} 
                                                        bsStyle="success" 
                                                        className="vm-actions">Start <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                                                </Button> : null}

                                            {row.original.state.toLowerCase() === "running" ?
                                                <Button onClick={this.endVirtualMachine.bind(this, row)} 
                                                        bsStyle="warning" 
                                                        className="vm-actions">Stop <span className="glyphicon glyphicon-stop" aria-hidden="true"></span>
                                                </Button> : null}

                                                {row.original.state.toLowerCase() === "running" ?
                                                <Button onClick={this.restartVirtualMachine.bind(this, row)} 
                                                        bsStyle="info" 
                                                        className="vm-actions">Restart <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                                                </Button> : null}

                                            {row.original.brand.toLowerCase() === "lx" || row.original.brand.toLowerCase() === "os"
                                            ? 
                                                <DropdownButton title="Edit" id="dropdown" className="vm-actions">
                                                    <MenuItem onClick={this.renameVirtualMachine.bind(this, row)} eventKey="1">Rename alias</MenuItem>
                                                    <MenuItem divider />
                                                    <MenuItem onClick={this.reprovisionVirtualMachine.bind(this, row)} eventKey="2">Reprovision</MenuItem>
                                                    <MenuItem onClick={this.resizeVirtualMachine.bind(this, row)} eventKey="3">Resize</MenuItem>
                                                    <MenuItem onClick={this.editNics.bind(this, row)} eventKey="3">Edit Nics</MenuItem>
                                                </DropdownButton> : null}

                                            <Button onClick={this.deleteVirtualMachine.bind(this, row)} 
                                                    bsStyle="danger" 
                                                    className="vm-actions">Delete <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                            </Button>
                                        </ButtonToolbar>
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
            hideNicModal
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineContainer);