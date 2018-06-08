import React from 'react'
import {connect, Dispatch, ReactNode} from "react-redux";
import { bindActionCreators } from "redux";
import { getVmsByOwner, 
        startVm, 
        stopVm, 
        rebootVm, 
        deleteVm, 
        showDeleteModal, 
        hideDeleteModal, 
        showRenameModal, 
        hideRenameModal, 
        showReprovisionModal, 
        hideReprovisionModal, 
        remoteFormSubmit, 
        renameVm, 
        hideResizeModal, 
        showResizeModal, 
        resizeVm, 
        showNicModal, 
        hideNicModal, 
        showProvisionModal, 
        hideProvisionModal} from "../../actions/virtualMachineActions";
import { showImageInformation, hideImageInformation } from '../../actions/imageActions';
import { hidePackageInformation, showPackageInformationModal } from '../../actions/packagesActions';
import ReactTable, { RowInfo } from 'react-table';
import LoadingSpinner from '../../components/misc/loadingSpinner';
import { LinkContainer } from "react-router-bootstrap";
import { FormGroup, NavItem, Button, Label } from "react-bootstrap";
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
import VirtualMachineProvisionModalContainer from './virtualMachineProvisionModalContainer';
import ImageInformationModalContainer from './imageInformationModalContainer';
import { State } from '../../store/initialState';
import PackageInformationModalContainer from './packageInformationModalContainer';
import VirtualMachineModel from '../../models/virtualMachineModel';
import ReactTableOptionsModel from '../../models/reactTableOptionsModel';
import { expandRow, clearExpandedRows } from '../../actions/reactTableActions';

class VirtualMachineContainer extends React.Component {
    props: any;

    columns: any[] = [
        { Header: 'State', accessor: 'state', maxWidth: 100, Cell: (row:any) => (
            <div style={{textAlign: 'center'}}>
                <Label bsStyle={this.stateCellColor(row.original)}>{row.original.state}</Label>
            </div>
        )},
        { Header: 'Name', accessor: 'alias' },
        { Header: 'Ram', accessor: 'ram' },
        { Header: 'Actions', maxWidth: 150, Cell: (row:RowInfo) => (
            <VirtualMachineActionsButton    row={row} 
                                            editNics={this.editNics.bind(this)} 
                                            startVirtualMachine={this.startVirtualMachine.bind(this)}
                                            endVirtualMachine={this.endVirtualMachine.bind(this)}
                                            restartVirtualMachine={this.restartVirtualMachine.bind(this)}
                                            renameVirtualMachine={this.renameVirtualMachine.bind(this)}
                                            reprovisionVirtualMachine={this.reprovisionVirtualMachine.bind(this)}
                                            resizeVirtualMachine={this.resizeVirtualMachine.bind(this)}
                                            deleteVirtualMachine={this.deleteVirtualMachine.bind(this)} />
        ) }
    ];

    stateCellColor(vm: VirtualMachineModel) {
        switch(vm.state) {
            case 'running':
                return 'success';
            case 'destroyed':
                return 'default black-label';
            case 'failed':
                return 'danger';
            case 'stopped':
                return 'default';
            case 'provisioning':
                return 'info';
            default:
                return 'default'
        }
    }

    async componentDidMount() {
        this.refreshTable();
    }

    async remoteVmProvision() {
        await this.props.actions.remoteFormSubmit('virtualMachineProvisionModal');
    }

    provisionVirtualMachine() {
        this.props.actions.showProvisionModal();
    }

    hideProvisionModal() {
        this.props.actions.hideProvisionModal();
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

    showImageInformation(row: any) {
        this.props.actions.showImageInformation(row);
    }

    hideImageInformationModal() {
        this.props.actions.hideImageInformation();
    }

    showPackageInformation(row: any) {
        this.props.actions.showPackageInformationModal(row);
    }

    hidePackageInformationModal() {
        this.props.actions.hidePackageInformation();
    }

    async refreshTable() {
        await this.props.actions.getVmsByOwner(this.props.authSession.user.data.ownerUuid, null);
        this.clearExpandedRows('virtualMachineForm');
        //this.fetchData(this.props.virtualMachines.tableOptions);
    }

    expandRow (row: RowInfo, expanded: boolean[], formName: string) {
        this.props.actions.expandRow(row, expanded, formName);
    }

    clearExpandedRows (formName: string) {
        this.props.actions.clearExpandedRows(formName);
    }

    // async fetchData(tableOptions: ReactTableOptionsModel) {
    //     await this.props.actions.getVmsByOwner(this.props.authSession.user.data.ownerUuid, {pageSize: tableOptions.pageSize, page: tableOptions.page, sorted: tableOptions.sorted})
    // }

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

                {this.props.showingProvisionModal != undefined ?
                    <MuiThemeProvider>
                        <Dialog actions={[    
                            <FlatButton label="Cancel"
                                        primary={true}
                                        onClick={this.hideProvisionModal.bind(this)}/>,
                            <FlatButton label="Provision machine"
                                        primary={true}
                                        onClick={this.remoteVmProvision.bind(this)}
                                        type="submit"/> ]}
                                title='Provision a virtual machine'
                                modal={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingProvisionModal}> 
                            <VirtualMachineProvisionModalContainer />
                        </Dialog>
                    </MuiThemeProvider>
                : null}

                {this.props.showingImageInformationModal != undefined ?
                    <MuiThemeProvider>
                        <Dialog actions={[    
                            <FlatButton label="Close"
                                        primary={true}
                                        onClick={this.hideImageInformationModal.bind(this)}/>]}
                                title={`${(this.props.image !== undefined && this.props.image !== null) ? this.props.image.name : 'Image'}`}
                                modal={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingImageInformationModal}> 
                            <ImageInformationModalContainer />
                        </Dialog>
                    </MuiThemeProvider>
                : null}
                
                {this.props.showingPackageInformationModal != undefined ?
                    <MuiThemeProvider>
                        <Dialog actions={[    
                            <FlatButton label="Close"
                                        primary={true}
                                        onClick={this.hidePackageInformationModal.bind(this)}/>]}
                                title={`${(this.props.package !== undefined && this.props.package !== null) ? this.props.package.name : 'Package'}`}
                                modal={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingPackageInformationModal}> 
                            <PackageInformationModalContainer />
                        </Dialog>
                    </MuiThemeProvider>
                : null}

                <FormGroup>
                    <button className="reperio-form-control reperio-btn reperio-neutral" onClick={this.provisionVirtualMachine.bind(this)}>
                        Provision virtual machine&nbsp;<span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                    </button>
                </FormGroup>
                
                <FormGroup>
                    <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.refreshTable.bind(this)}>
                        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                    </button>
                </FormGroup>
                
                <ReactTable data={this.props.virtualMachines.vms}
                            //manual
                            columns={this.columns}
                            className="-striped -highlight"
                            // pages={this.props.virtualMachines.pages}
                            // onFetchData={this.fetchData.bind(this)}
                            defaultPageSize={20}
                            expanded={this.props.expandedRows}                      
                            defaultSorted={[
                                {
                                  id: "alias",
                                  asc: true
                                }
                            ]}
                            onPageChange={() => {
                                this.clearExpandedRows('virtualMachineForm');
                            }}
                            onSortedChange={() => {
                                this.clearExpandedRows('virtualMachineForm');
                            }}
                            getTdProps={(state: any, rowInfo: RowInfo) => { 
                                return { onClick: (e:any) => {
                                    const classes = Array.from(e.target.classList);
                                    if (!classes.includes('reperio-btn') && e.target.tagName !== "A" && e.target.innerHTML !== '<span>&nbsp;</span>' && e.target.innerHTML.trim() !== '') {
                                        this.expandRow(rowInfo, state.expanded, 'virtualMachineForm');
                                    }
                                }} 
                            }}
                            SubComponent={(row: RowInfo) => {
                                return(
                                    <div className="nested-table-container">
                                        <VirtualMachineExtendedDetails showPackageInformation={this.showPackageInformation.bind(this, row)} showImageInformation={this.showImageInformation.bind(this, row)} data={row.original} />
                                    </div>
                                );
                            }}/>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
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
        showingProvisionModal: selector(state, 'showingProvisionModal'),
        showingImageInformationModal: selector(state, 'showingImageInformationModal'),
        showingPackageInformationModal: selector(state, 'showingPackageInformationModal'),
        row: selector(state, 'row'),
        image: selector(state, 'image'),
        package: selector(state, 'package'),
        expandedRows: selector(state, 'expandedRows')
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
            showProvisionModal,
            hideProvisionModal,
            showImageInformation,
            hideImageInformation,
            hidePackageInformation,
            showPackageInformationModal,
            expandRow,
            clearExpandedRows
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineContainer);