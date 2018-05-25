import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllFabricNetworksByOwnerId, deleteFabricNetwork, showDeleteModal, hideDeleteModal, hideCreateModal, showCreateModal, remoteFormSubmit } from "../../actions/networkActions";
import ReactTable from 'react-table';
import LoadingSpinner from '../../components/misc/loadingSpinner';
import { FormGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Button }  from "react-bootstrap";
import NetworkForm from '../../components/network/networkForm';
import { formValueSelector } from 'redux-form';
import 'react-table/react-table.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FlatButton, Dialog } from 'material-ui';
import NetworkDeleteModalContainer from './networkDeleteModalContainer';
import NetworkMachineExtendedDetails from '../../components/network/networkExtendedDetails';
import NetworkActionsButton from '../../components/network/networkActionsButton';
import NetworkCreateModalContainer from './networkCreateModalContainer';

class NetworkContainer extends React.Component {
    props: any;

    columns: any[] = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Provision start IP', accessor: 'provision_start_ip' },
        { Header: 'Provision end IP', accessor: 'provision_end_ip'},
        { Header: 'Actions', Cell: (row:any) => (
            <NetworkActionsButton   row={row} 
                                    deleteNetwork={this.deleteNetwork.bind(this)} />
        ) }
    ];

    async componentDidMount() {
        this.refreshTable();
    }

    async deleteModal() {
        await this.props.actions.deleteFabricNetwork(this.props.authSession.user.data.ownerUuid, this.props.row.original.vlan_id, this.props.row.original.uuid);
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
        await this.props.actions.getAllFabricNetworksByOwnerId(this.props.authSession.user.data.ownerUuid);
    }

    render() {
        return (
            <div>
                {this.props.networks.isLoading || this.props.networkActions.isLoading ? <LoadingSpinner/> : null}
                <NetworkForm errorMessages={this.props.errorMessages} />

                {this.props.showingDeleteModal != undefined ?
                    <MuiThemeProvider>
                        <Dialog actions={[    
                            <FlatButton label="Cancel"
                                        primary={true}
                                        onClick={this.hideDeleteModal.bind(this)}/>,
                            <FlatButton label="Yes"
                                        primary={true}
                                        onClick={this.deleteModal.bind(this)}/> ]}
                                title={'Are you sure you want to delete this network?'}
                                modal={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingDeleteModal}>
                                    <NetworkDeleteModalContainer />
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
                                        onClick={this.remoteCreate.bind(this)}/> ]}
                                title={'Create a fabric network'}
                                modal={true}
                                autoScrollBodyContent={true}
                                open={this.props.showingCreateModal}>
                                    <NetworkCreateModalContainer />
                        </Dialog>
                    </MuiThemeProvider>
                : null}

                <FormGroup>
                    <Button bsStyle="primary" onClick={this.createNetwork.bind(this)}>Create a network <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></Button>
                </FormGroup>
                
                <FormGroup>
                    <Button onClick={this.refreshTable.bind(this)} bsStyle="default"><span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></Button>
                </FormGroup>

                <ReactTable data={this.props.networks.networks} 
                            columns={this.columns}
                            className="-striped -highlight"
                            SubComponent={row => {
                                return(
                                    <div className="nested-table-container">
                                        <NetworkMachineExtendedDetails data={row.original} />
                                    </div>
                                );
                            }}/>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('networkForm');
    return {
        authSession: state.authSession,
        networks: state.networks,
        networkActions: state.networkActions,
        errorMessages: selector(state, 'errorMessages'),
        showingDeleteModal: selector(state, 'showingDeleteModal'),
        showingCreateModal: selector(state, 'showingCreateModal'),
        row: selector(state, 'row')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getAllFabricNetworksByOwnerId, deleteFabricNetwork, showDeleteModal, hideDeleteModal, hideCreateModal, showCreateModal, remoteFormSubmit}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NetworkContainer);