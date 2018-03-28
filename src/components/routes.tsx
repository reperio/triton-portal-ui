import React from 'react'

import { Route, Switch } from "react-router-dom";
import {Redirect} from "react-router";
import LoginFormContainer from "../containers/loginFormContainer";
import PrivateRouteContainer from "../containers/privateRouteContainer";
import PublicRouteContainer from "../containers/publicRouteContainer";
import MainDashboardContainer from "../containers/mainDashboardContainer";
import VirtualMachinesContainer from "../containers/virtualMachinesContainer";
import CreateAccountFormContainer from '../containers/createAccountFormContainer';
import CreateVirtualMachineFormContainer from '../containers/createVirtualMachineFormContainer';

const Routes = (props: any) => (
    <div className="contentContainer" style={{backgroundColor: "white", padding: "15px"}}>
        <Switch>
            <PrivateRouteContainer exact path="/home" component={MainDashboardContainer} />
            <PrivateRouteContainer exact path="/virtual-machines" component={VirtualMachinesContainer} />
            <PrivateRouteContainer exact path="/create-virtual-machine" component={CreateVirtualMachineFormContainer} />
            <PublicRouteContainer exact path="/login" component={LoginFormContainer} />
            <PublicRouteContainer exact path="/create-account" component={CreateAccountFormContainer} />
            <Route>
                <Redirect to="/home"/>
            </Route>
        </Switch>

    </div>
);

export default Routes;