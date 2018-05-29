import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VirtualMachineDeleteModal from "../../components/virtualMachine/virtualMachineDeleteModal";
import { formValueSelector } from 'redux-form';
import LoadingSpinner from '../../components/misc/loadingSpinner';
import { State } from '../../store/initialState';

class VirtualMachineDeleteModalContainer extends React.Component {
    props: any;

    render() {
        return (
            <div>
                <VirtualMachineDeleteModal errorMessages={this.props.errorMessages}/>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('virtualMachineForm');
    const selectorModal = formValueSelector('virtualMachineDeleteModal');
    return {
        authSession: state.authSession,
        errorMessages: selectorModal(state, 'errorMessages'),
        row: selector(state, 'row')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(VirtualMachineDeleteModalContainer);