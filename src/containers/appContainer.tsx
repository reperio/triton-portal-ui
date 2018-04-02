import React from 'react'
import {connect} from "react-redux";
import NavMenuContainer from "../containers/navMenuContainer";
import Routes from "../components/routes";

class AppContainer extends React.Component {
    props: any;

    render() {
        return (
            <div className="page-container">
                <NavMenuContainer/>
                <Routes/>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return { };
}

export default connect(mapStateToProps, null, null, {pure: false})(AppContainer);