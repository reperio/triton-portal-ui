import React from 'react'
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import {getAllVms} from "../actions/virtualMachineActions";
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
        await this.props.actions.getAllVms();
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
                    className="-striped -highlight"/>
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
        actions: bindActionCreators({getAllVms}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachinesContainer);