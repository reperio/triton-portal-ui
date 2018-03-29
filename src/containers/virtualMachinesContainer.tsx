import React from 'react'
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import {getVmsByOwner, getAllVms} from "../actions/virtualMachineActions";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import LoadingSpinner from '../components/loadingSpinner';
import {FormGroup} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {NavItem} from "react-bootstrap";

class VirtualMachinesContainer extends React.Component {
    props: any;
    data: any[];

    columns: any[] = [
        { Header: 'Name', accessor: 'alias' },
        { Header: 'Ram', accessor: 'ram' }
    ];

    async componentDidMount() {
        await this.props.actions.getAllVms(this.props.authSession.user.data.ownerUuid);
    }

    handleButtonClick(e:any) {
        
    }

    render() {
        return (
            <div>
                {this.props.virtualMachines.isLoading ? <LoadingSpinner/> : null}
                {this.props.virtualMachines.errorMessages.length > 0 ? <p className="alert alert-danger">{this.props.virtualMachines.errorMessage}</p> : ""}
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
                                <button onClick={this.handleButtonClick.bind(row.original)} className="btn btn-success vm-actions"><span className="glyphicon glyphicon-play" aria-hidden="true"></span></button>
                                <button className="btn btn-warning vm-actions"><span className="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
                                <button className="btn btn-info vm-actions"><span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>
                                <button className="btn btn-danger vm-actions"><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
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
        virtualMachines: state.virtualMachines
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getVmsByOwner, getAllVms}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachinesContainer);