import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import LoadingSpinner from '../components/loadingSpinner';

class PackageInformationContainer extends React.Component {
    props: any;
    data: any[];

    async componentDidMount() {
        //await this.props.actions.getAllVms();
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(PackageInformationContainer);