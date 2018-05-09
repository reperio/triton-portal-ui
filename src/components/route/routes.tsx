import React from 'react'

import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import LoginFormContainer from "../../containers/login/loginFormContainer";
import PrivateRouteContainer from "../../containers/route/privateRouteContainer";
import PublicRouteContainer from "../../containers/route/publicRouteContainer";
import MainDashboardContainer from "../../containers/main/mainDashboardContainer";
import VirtualMachineContainer from "../../containers/virtualMachine/virtualMachineContainer";
import AccountCreateFormContainer from '../../containers/account/accountCreateFormContainer';
import VirtualMachineCreateFormContainer from '../../containers/virtualMachine/virtualMachineCreateFormContainer';
import AccountEditFormContainer from '../../containers/account/accountEditFormContainer';
import NetworkCreateFormContainer from '../../containers/network/networkCreateFormContainer';
import NetworkFormContainer from '../../containers/network/networkFormContainer';

const Routes = (props: any) => (
    <div className="contentContainer" style={{backgroundColor: "white", padding: "15px"}}>
        <Switch>
            <PublicRouteContainer exact path="/login" component={LoginFormContainer} />
            <PrivateRouteContainer exact path="/home" component={MainDashboardContainer} />
            <PrivateRouteContainer exact path="/virtual-machines" component={VirtualMachineContainer} />
            <PrivateRouteContainer exact path="/create-virtual-machine" component={VirtualMachineCreateFormContainer} />
            <PublicRouteContainer exact path="/create-account" component={AccountCreateFormContainer} />
            <PrivateRouteContainer exact path="/edit-account" component={AccountEditFormContainer} />
            <PrivateRouteContainer exact path="/networks" component={NetworkFormContainer} />
            <PrivateRouteContainer exact path="/create-network" component={NetworkCreateFormContainer} />
            <Route>
                <Redirect to="/home"/>
            </Route>
        </Switch>

    </div>
);

export default Routes;