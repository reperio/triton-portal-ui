import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NetworkDeleteModal from "../../components/network/networkDeleteModal";
import { formValueSelector } from 'redux-form';

class NetworkDeleteModalContainer extends React.Component {
    props: any;

    render() {
        return (
            <div>
                <NetworkDeleteModal errorMessages={this.props.errorMessages}/>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('networkForm');
    const selectorModal = formValueSelector('networkDeleteModal');
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

export default connect(mapStateToProps, mapActionToProps)(NetworkDeleteModalContainer);