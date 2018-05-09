import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllFabricNetworksByOwnerId, deleteFabricNetwork } from "../../actions/networkActions";
import ReactTable from 'react-table';
import LoadingSpinner from '../../components/misc/loadingSpinner';
import { FormGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavItem, Button }  from "react-bootstrap";
import NetworkForm from '../../components/network/networkForm';
import { formValueSelector } from 'redux-form';
import 'react-table/react-table.css';

class NetworkFormContainer extends React.Component {
    props: any;

    columns: any[] = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Provision start IP', accessor: 'provision_start_ip' },
        { Header: 'Provision end IP', accessor: 'provision_end_ip'}
    ];

    async componentDidMount() {
        await this.props.actions.getAllFabricNetworksByOwnerId(this.props.authSession.user.data.ownerUuid);
    }

    async deleteNetwork(row:any) {
        await this.props.actions.deleteFabricNetwork(this.props.authSession.user.data.ownerUuid, row.original.vlan_id, row.original.uuid);
        await this.componentDidMount();
    }

    render() {
        return (
            <div>
                {this.props.networks.isLoading || this.props.networkActions.isLoading ? <LoadingSpinner/> : null}
                <NetworkForm errorMessages={this.props.errorMessages} />
                <FormGroup>
                    <LinkContainer to="/create-network"><NavItem>Create a network</NavItem></LinkContainer>
                </FormGroup>
                <ReactTable 
                    data={this.props.networks.networks} 
                    columns={this.columns}
                    className="-striped -highlight"
                    SubComponent={row => {
                        return(
                            <div>
                                <Button onClick={this.deleteNetwork.bind(this, row)} bsStyle="danger" className="vm-actions">Delete <span className="glyphicon glyphicon-trash" aria-hidden="true"></span></Button>
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

export default connect(mapStateToProps, mapActionToProps)(NetworkFormContainer);