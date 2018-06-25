import React from 'react';
import {connect} from "react-redux";
import PrivateRoute from "../../components/route/routeHelperComponents/privateRoute";
import { State } from '../../store/initialState';

class PrivateRouteContainer extends React.Component {
    props: any;

    render() {
        return (
            <PrivateRoute isAuthenticated={this.props.authSession.isAuthenticated} {...this.props} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

export default connect(mapStateToProps)(PrivateRouteContainer) as any;