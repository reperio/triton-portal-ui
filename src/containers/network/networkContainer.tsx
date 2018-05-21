import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllFabricNetworksByOwnerId, deleteFabricNetwork } from "../../actions/networkActions";
import ReactTable from 'react-table';
import LoadingSpinner from '../../components/misc/loadingSpinner';
import { FormGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Button }  from "react-bootstrap";
import NetworkForm from '../../components/network/networkForm';
import { formValueSelector } from 'redux-form';
import 'react-table/react-table.css';

class NetworkContainer extends React.Component {
    props: any;

    columns: any[] = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Provision start IP', accessor: 'provision_start_ip' },
        { Header: 'Provision end IP', accessor: 'provision_end_ip'}
    ];

    async componentDidMount() {
        this.refreshTable();
    }

    async deleteNetwork(row:any) {
        await this.props.actions.deleteFabricNetwork(this.props.authSession.user.data.ownerUuid, row.original.vlan_id, row.original.uuid);
    }

    async refreshTable() {
        await this.props.actions.getAllFabricNetworksByOwnerId(this.props.authSession.user.data.ownerUuid);
    }

    render() {
        return (
            <div>
                {this.props.networks.isLoading || this.props.networkActions.isLoading ? <LoadingSpinner/> : null}
                <NetworkForm errorMessages={this.props.errorMessages} />

                <FormGroup>
                    <LinkContainer to="/create-network">
                        <Button bsStyle="primary">Create a network <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></Button>
                    </LinkContainer>
                </FormGroup>
                
                <FormGroup>
                    <Button onClick={this.refreshTable.bind(this)} bsStyle="default"><span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></Button>
                </FormGroup>

                <ReactTable data={this.props.networks.networks} 
                            columns={this.columns}
                            className="-striped -highlight"
                            SubComponent={row => {
                                return(
                                    <div>
                                        <Button bsStyle="danger"
                                                onClick={this.deleteNetwork.bind(this, row)}
                                                className="vm-actions">Delete <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                        </Button>
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
        errorMessages: selector(state, 'errorMessages')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getAllFabricNetworksByOwnerId, deleteFabricNetwork}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NetworkContainer);