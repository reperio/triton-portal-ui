import React from 'react'
import {connect} from "react-redux";
import { authService } from '../../services/authService';
import { extendSession, logout, hideExpirationDialog, updateTimeLeftOnToken } from '../../actions/authActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FlatButton, Dialog } from 'material-ui';
import { formValueSelector } from 'redux-form';
import { bindActionCreators } from "redux";

import NavMenu from "../../components/navMenu/navMenu";

class NavMenuContainer extends React.Component {
    props: any;

    async componentDidMount() {
        let interval: number = window.setInterval(() => {
            this.props.actions.updateTimeLeftOnToken(this.props.showingExpirationDialog);
         }, 1000);
    }

    logout() {
        this.props.actions.hideExpirationDialog();
        this.props.actions.logout();
    }

    extendSession() {
        this.props.actions.hideExpirationDialog();
        this.props.actions.extendSession();
    }

    render() {
        return (
            <div className="r-nav-menu">
                <MuiThemeProvider>
                    <Dialog 
                        actions={[    
                        <FlatButton
                            label="Log out"
                            primary={true}
                            onClick={this.logout.bind(this)}/>,
                        <FlatButton
                            label="Extend session"
                            primary={true}
                            onClick={this.extendSession.bind(this)}
                            type="submit"/>]}
                        title={`Your session will expire in ${this.props.timeLeftOnToken}`}
                        modal={true}
                        open={this.props.showingExpirationDialog === undefined? false : this.props.showingExpirationDialog}
                        > 
                    </Dialog>
                </MuiThemeProvider>

                <NavMenu authSession={this.props.authSession} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('navMenu');

    return {
        authSession: state.authSession,
        showingExpirationDialog: selector(state, 'showingExpirationDialog'),
        timeLeftOnToken: selector(state, 'timeLeftOnToken')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({
            extendSession, 
            logout,
            hideExpirationDialog,
            updateTimeLeftOnToken
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NavMenuContainer);