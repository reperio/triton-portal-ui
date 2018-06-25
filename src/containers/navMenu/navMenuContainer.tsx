import React from 'react'
import { connect } from "react-redux";
import { authService } from '../../services/authService';
import { extendSession, logout, hideExpirationDialog, updateTimeLeftOnToken } from '../../actions/authActions';
import { locationChange } from '../../actions/navActions';
import { formValueSelector } from 'redux-form';
import { bindActionCreators } from "redux";
import { history } from '../../store/history';
import NavMenu from "../../components/navMenu/navMenu";
import ModalWindow from '../../components/misc/modalWindow';
import { StateAccount, State } from '../../store/initialState';

class NavMenuContainer extends React.Component {
    props: any;

    async componentDidMount() {
        this.props.actions.locationChange(history.location.pathname);
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

    navigateTo(destination: string) {
        this.props.actions.locationChange(destination);
    }

    render() {
        return (
            <div className="r-nav-menu">
                <ModalWindow    open={this.props.showingExpirationDialog} 
                                title={`Your session will expire in ${this.props.timeLeftOnToken}`}
                                close={this.logout.bind(this)}
                                priority={true}
                                actions={[
                                    <button className="reperio-form-control reperio-btn reperio-cancel" onClick={this.logout.bind(this)}>Log out</button>,
                                    <button className="reperio-form-control reperio-btn reperio-neutral" onClick={this.extendSession.bind(this)}>Extend session</button>]}>
                </ModalWindow>
                <NavMenu logout={this.logout.bind(this)} navigateTo={this.navigateTo.bind(this)} location={this.props.location} authSession={this.props.authSession} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('navMenu');

    return {
        authSession: state.authSession,
        showingExpirationDialog: selector(state, 'showingExpirationDialog'),
        timeLeftOnToken: selector(state, 'timeLeftOnToken'),
        location: selector(state, 'location')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({
            extendSession, 
            logout,
            hideExpirationDialog,
            updateTimeLeftOnToken,
            locationChange
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NavMenuContainer);