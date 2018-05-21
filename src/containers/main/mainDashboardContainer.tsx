import React from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router";

import MainDashboard from "../../components/main/mainDashboard";

class MainDashboardContainer extends React.Component {
    props: any;

    render() {
        return (
            <div>
                <MainDashboard authSession={this.props.authSession} />
             </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession
    };
}

export default connect(mapStateToProps, null, null, {pure: false})(MainDashboardContainer);