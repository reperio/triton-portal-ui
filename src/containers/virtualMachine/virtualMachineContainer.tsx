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
import { toggleLoadingBar } from "../../actions/navActions";
import ModalWindow from '../../components/misc/modalWindow';

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
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.startVm(this.props.authSession.user.data.ownerUuid, row.original.uuid);
        this.props.actions.toggleLoadingBar(false);
    }

    async endVirtualMachine(row:any) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.stopVm(this.props.authSession.user.data.ownerUuid, row.original.uuid);
        this.props.actions.toggleLoadingBar(false);
    }

    async restartVirtualMachine(row:any) {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.rebootVm(this.props.authSession.user.data.ownerUuid, row.original.uuid);
        this.props.actions.toggleLoadingBar(false);
    }

    //delete vm
    async deleteModal() {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.deleteVm(this.props.authSession.user.data.ownerUuid, this.props.row.original.uuid);
        this.props.actions.toggleLoadingBar(false);
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
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.getVmsByOwner(this.props.authSession.user.data.ownerUuid, null);
        this.clearExpandedRows('virtualMachineForm');
        this.props.actions.toggleLoadingBar(false);
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
                <fieldset disabled={this.props.isLoading}>
                    <VirtualMachineForm errorMessages={this.props.errorMessages} />

                    <ModalWindow    open={this.props.showingDeleteModal} 
                                    title={'Are you sure you want to delete this Virtual Machine?'}
                                    close={this.hideDeleteModal.bind(this)}
                                    actions={[
                                        <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.hideDeleteModal.bind(this)}>Cancel</button>,
                                        <button className="reperio-form-control reperio-btn reperio-warning" onClick={this.deleteModal.bind(this)}>Delete</button>]}>
                             <VirtualMachineDeleteModalContainer/>
                    </ModalWindow>

                    <ModalWindow    open={this.props.showingReprovisionModal} 
                                    title={'Repovision Virtual Machine'}
                                    close={this.hideReprovisionModal.bind(this)}
                                    actions={[
                                        <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.hideReprovisionModal.bind(this)}>Cancel</button>,
                                        <button className="reperio-form-control reperio-btn reperio-success" onClick={this.remoteVmReprovision.bind(this)}>Reprovision machine</button>]}>
                        <VirtualMachineReprovisionModalContainer />
                    </ModalWindow>

                    <ModalWindow    open={this.props.showingResizeModal} 
                                    title={'Resize Virtual Machine'}
                                    close={this.hideResizeModal.bind(this)}
                                    actions={[
                                        <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.hideResizeModal.bind(this)}>Cancel</button>,
                                        <button className="reperio-form-control reperio-btn reperio-success" onClick={this.remoteVmResize.bind(this)}>Resize</button>]}>
                             <VirtualMachineResizeModalContainer/>
                    </ModalWindow>

                    <ModalWindow    open={this.props.showingRenameModal} 
                                    title={'Rename Virtual Machine Alias'}
                                    close={this.hideRenameModal.bind(this)}
                                    actions={[
                                        <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.hideRenameModal.bind(this)}>Cancel</button>,
                                        <button className="reperio-form-control reperio-btn reperio-success" onClick={this.remoteVmRename.bind(this)}>Rename</button>]}>
                             <VirtualMachineRenameModalContainer/>
                    </ModalWindow>

                    <ModalWindow    open={this.props.showingNicModal} 
                                    title={'Edit Nics'}
                                    close={this.hideNicModal.bind(this)}
                                    actions={[
                                        <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.hideNicModal.bind(this)}>Cancel</button>,
                                        <button className="reperio-form-control reperio-btn reperio-success" onClick={this.remoteNic.bind(this)}>Update</button>]}>
                             <VirtualMachineEditNicsModalContainer/>
                    </ModalWindow>

                    <ModalWindow    open={this.props.showingProvisionModal} 
                                    title={'Provision Machine'}
                                    close={this.hideProvisionModal.bind(this)}
                                    actions={[
                                        <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.hideProvisionModal.bind(this)}>Cancel</button>,
                                        <button className="reperio-form-control reperio-btn reperio-success" onClick={this.remoteVmProvision.bind(this)}>Provision machine</button>]}>
                             <VirtualMachineProvisionModalContainer/>
                    </ModalWindow>

                    <ModalWindow    open={this.props.showingImageInformationModal} 
                                    title={'Image Information'}
                                    close={this.hideImageInformationModal.bind(this)}
                                    actions={[
                                        <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.hideImageInformationModal.bind(this)}>Close</button>]}>
                             <ImageInformationModalContainer/>
                    </ModalWindow>

                    <ModalWindow    open={this.props.showingPackageInformationModal} 
                                    title={'Package Information'}
                                    close={this.hidePackageInformationModal.bind(this)}
                                    actions={[
                                        <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.hidePackageInformationModal.bind(this)}>Close</button>]}>
                             <PackageInformationModalContainer/>
                    </ModalWindow>

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
                                        if (!classes.includes('reperio-btn') && !classes.includes('dropdown-item') && !classes.includes('dropdown-content') && e.target.innerHTML !== '<span>&nbsp;</span>' && e.target.innerHTML.trim() !== '') {
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
                </fieldset>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorLoading = formValueSelector('reperioBar');
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
        expandedRows: selector(state, 'expandedRows'),
        isLoading: selectorLoading(state, 'isLoading')
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
            clearExpandedRows,
            toggleLoadingBar
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineContainer);