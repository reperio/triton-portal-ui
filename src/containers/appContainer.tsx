import React from 'react'
import {connect} from "react-redux";
import Routes from "../components/route/routes";
import { State } from '../store/initialState';

class AppContainer extends React.Component {
    props: any;

    render() {
        return (
            <div className="page-container">
                <Routes/>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return { };
}

export default connect(mapStateToProps, null, null, {pure: false})(AppContainer);