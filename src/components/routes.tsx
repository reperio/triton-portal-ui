import React from 'react'

import { Route, Switch } from "react-router-dom";
import {Redirect} from "react-router";
import LoginFormContainer from "../containers/loginFormContainer";
import PrivateRouteContainer from "../containers/privateRouteContainer";
import PublicRouteContainer from "../containers/publicRouteContainer";
import MainDashboardContainer from "../containers/mainDashboardContainer";
import VirtualMachinesContainer from "../containers/virtualMachinesContainer";
import AccountCreateFormContainer from '../containers/accountCreateFormContainer';
import VirtualMachineCreateFormContainer from '../containers/virtualMachineCreateFormContainer';
import AccountEditFormContainer from '../containers/accountEditFormContainer';
import NetworkCreateFormContainer from '../containers/networkCreateFormContainer';
import NetworksFormContainer from '../containers/networksFormContainer';

const Routes = (props: any) => (
    <div className="contentContainer" style={{backgroundColor: "white", padding: "15px"}}>
        <Switch>
            <PublicRouteContainer exact path="/login" component={LoginFormContainer} />
            <PrivateRouteContainer exact path="/home" component={MainDashboardContainer} />
            <PrivateRouteContainer exact path="/virtual-machines" component={VirtualMachinesContainer} />
            <PrivateRouteContainer exact path="/create-virtual-machine" component={VirtualMachineCreateFormContainer} />
            <PublicRouteContainer exact path="/create-account" component={AccountCreateFormContainer} />
            <PrivateRouteContainer exact path="/edit-account" component={AccountEditFormContainer} />
            <PrivateRouteContainer exact path="/networks" component={NetworksFormContainer} />
            <PrivateRouteContainer exact path="/create-network" component={NetworkCreateFormContainer} />
            <Route>
                <Redirect to="/home"/>
            </Route>
        </Switch>

    </div>
);

export default Routes;