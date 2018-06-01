import React from 'react'

import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import LoginFormContainer from "../../containers/login/loginFormContainer";
import PrivateRouteContainer from "../../containers/route/privateRouteContainer";
import PublicRouteContainer from "../../containers/route/publicRouteContainer";
import MainDashboardContainer from "../../containers/main/mainDashboardContainer";
import VirtualMachineContainer from "../../containers/virtualMachine/virtualMachineContainer";
import AccountCreateFormContainer from '../../containers/account/accountCreateFormContainer';
import AccountEditFormContainer from '../../containers/account/accountEditFormContainer';
import NetworkContainer from '../../containers/network/networkContainer';

const Routes = (props: any) => (
    <div className="contentContainer">
        <Switch>
            <PublicRouteContainer exact path="/login" component={LoginFormContainer} />
            <PrivateRouteContainer exact path="/home" component={MainDashboardContainer} />
            <PrivateRouteContainer exact path="/virtual-machines" component={VirtualMachineContainer} />
            <PublicRouteContainer exact path="/create-account" component={AccountCreateFormContainer} />
            <PrivateRouteContainer exact path="/edit-account" component={AccountEditFormContainer} />
            <PrivateRouteContainer exact path="/networks" component={NetworkContainer} />
            <Route>
                <Redirect to="/home"/>
            </Route>
        </Switch>

    </div>
);

export default Routes;