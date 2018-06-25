import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllFabricNetworksByOwnerId, deleteFabricNetwork, showDeleteModal, hideDeleteModal, hideCreateModal, showCreateModal, remoteFormSubmit } from "../../actions/networkActions";
import ReactTable, { RowInfo } from 'react-table';
import { FormGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NetworkForm from '../../components/network/networkForm';
import { formValueSelector } from 'redux-form';
import 'react-table/react-table.css';
import NetworkDeleteModalContainer from './networkDeleteModalContainer';
import NetworkMachineExtendedDetails from '../../components/network/networkExtendedDetails';
import NetworkActionsButton from '../../components/network/networkActionsButton';
import NetworkCreateModalContainer from './networkCreateModalContainer';
import { expandRow, clearExpandedRows } from '../../actions/reactTableActions';
import { toggleLoadingBar } from "../../actions/navActions";
import ModalWindow from '../../components/misc/modalWindow';
import { State } from '../../store/initialState';

class NetworkContainer extends React.Component {
    props: any;

    columns: any[] = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Vlan ID', accessor: 'vlan_id' },
        { Header: 'Gateway', accessor: 'gateway' },
        { Header: 'Range', Cell: (row: RowInfo) => (<div>{row.original.provision_start_ip} - {row.original.provision_end_ip}</div>) },
        { Header: 'Resolvers', Cell: (row: RowInfo) => (<div>{row.original.resolvers.map((resolver:string) => resolver).toString().replace(/,/g, ', ')}</div>) },
        { Header: 'Actions', Cell: (row: RowInfo) => (
            <NetworkActionsButton   row={row} 
                                    deleteNetwork={this.deleteNetwork.bind(this)} />
        ) }
    ];

    async componentDidMount() {
        this.refreshTable();
    }

    async deleteModal() {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.deleteFabricNetwork(this.props.authSession.user.ownerUuid, this.props.row.original.vlan_id, this.props.row.original.uuid);
        this.props.actions.toggleLoadingBar(false);
    }

    deleteNetwork(row:any) {
        this.props.actions.showDeleteModal(row);
    }

    hideDeleteModal() {
        this.props.actions.hideDeleteModal();
    }

    async remoteCreate() {
        await this.props.actions.remoteFormSubmit('networkCreateModal');
    }

    createNetwork() {
        this.props.actions.showCreateModal();
    }

    hideCreateModal() {
        this.props.actions.hideCreateModal();
    }

    async refreshTable() {
        this.props.actions.toggleLoadingBar(true);
        await this.props.actions.getAllFabricNetworksByOwnerId(this.props.authSession.user.ownerUuid);
        this.props.actions.toggleLoadingBar(false);
    }

    expandRow (row: RowInfo, expanded: boolean[], formName: string) {
        this.props.actions.expandRow(row, expanded, formName);
    }

    clearExpandedRows (formName: string) {
        this.props.actions.clearExpandedRows(formName);
    }

    render() {
        return (
            <fieldset disabled={this.props.isLoading}>
                <NetworkForm errorMessages={this.props.errorMessages} />

                {this.props.showingDeleteModal != undefined ?
                    <ModalWindow    open={this.props.showingDeleteModal} 
                                    title={'Are you sure you want to delete this network?'}
                                    close={this.hideDeleteModal.bind(this)}
                                    actions={[
                                        <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.hideDeleteModal.bind(this)}>Cancel</button>,
                                        <button className="reperio-form-control reperio-btn reperio-success" onClick={this.deleteModal.bind(this)}>Yes</button>]}>
                        <NetworkDeleteModalContainer/>
                    </ModalWindow>
                : null}

                {this.props.showingCreateModal != undefined ?
                    <ModalWindow    open={this.props.showingCreateModal} 
                                    title={'Create a fabric network'}
                                    close={this.hideDeleteModal.bind(this)}
                                    actions={[
                                        <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.hideCreateModal.bind(this)}>Cancel</button>,
                                        <button className="reperio-form-control reperio-btn reperio-success" onClick={this.remoteCreate.bind(this)}>Create</button>]}>
                        <NetworkCreateModalContainer/>
                    </ModalWindow>
                : null}

                <FormGroup>
                    <button className="reperio-form-control reperio-btn reperio-neutral" onClick={this.createNetwork.bind(this)}>
                        Create a network&nbsp;<span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                    </button>
                </FormGroup>
                
                <FormGroup>
                    <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.refreshTable.bind(this)}>
                        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                    </button>
                </FormGroup>

                <ReactTable data={this.props.networks.networks} 
                            columns={this.columns}
                            className="-striped -highlight"
                            defaultPageSize={20}
                            expanded={this.props.expandedRows}
                            defaultSorted={[
                                {
                                  id: "name",
                                  asc: true
                                }
                            ]}
                            onPageChange={() => {
                                this.clearExpandedRows('networkForm');
                            }}
                            onSortedChange={() => {
                                this.clearExpandedRows('networkForm');
                            }}
                            getTdProps={(state: any, rowInfo: RowInfo) => { 
                                return { onClick: (e:any) => {
                                    const classes = Array.from(e.target.classList);
                                    if (!classes.includes('reperio-btn') && e.target.innerHTML !== '<span>&nbsp;</span>' && (e.target.innerHTML.includes('table-action-button-toolbar') || e.target.innerHTML !== '')) {
                                        this.expandRow(rowInfo, state.expanded, 'networkForm');
                                    }
                                }} 
                            }}
                            SubComponent={row => {
                                return(
                                    <div className="nested-table-container">
                                        <NetworkMachineExtendedDetails data={row.original} />
                                    </div>
                                );
                            }}/>
            </fieldset>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('networkForm');
    const selectorLoading = formValueSelector('reperioBar');
    return {
        authSession: state.authSession,
        networks: state.networks,
        networkActions: state.networkActions,
        errorMessages: selector(state, 'errorMessages'),
        showingDeleteModal: selector(state, 'showingDeleteModal'),
        showingCreateModal: selector(state, 'showingCreateModal'),
        row: selector(state, 'row'),
        expandedRows: selector(state, 'expandedRows'),
        isLoading: selectorLoading(state, 'isLoading')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({
            getAllFabricNetworksByOwnerId, 
            deleteFabricNetwork, 
            showDeleteModal, 
            hideDeleteModal, 
            hideCreateModal, 
            showCreateModal,
            remoteFormSubmit, 
            expandRow, 
            clearExpandedRows,
            toggleLoadingBar
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NetworkContainer);