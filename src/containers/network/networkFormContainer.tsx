import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllFabricNetworksByOwnerId, deleteFabricNetwork } from "../../actions/networkActions";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import LoadingSpinner from '../../components/misc/loadingSpinner';
import { FormGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavItem}  from "react-bootstrap";
import Error from '../../components/misc/error';

class NetworkFormContainer extends React.Component {
    props: any;
    data: any[];

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
                {this.props.networks.errorMessages.length || this.props.networkActions.errorMessages.length > 0 ? <Error errors={this.props.networks.errorMessages.concat(this.props.networkActions.errorMessages)}/> : null}
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
                                <button onClick={this.deleteNetwork.bind(this, row)} className="btn btn-danger vm-actions"><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
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
        networks: state.networks,
        networkActions: state.networkActions
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getAllFabricNetworksByOwnerId, deleteFabricNetwork}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NetworkFormContainer);