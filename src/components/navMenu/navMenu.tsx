import React from 'react'
import {MenuItem, Nav, Navbar, NavDropdown, NavItem, Button} from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

import NavMenuLoginLink from "./navMenuLoginLink";
import NavMenuLogOutLinkContainer from "../../containers/navMenu/navMenuLogOutLinkContainer";
const reperio = require('../../assets/reperio-rAsset-31.png');

const NavMenu = (props: any) => (
    <div className="r-nav-menu">
        <div className="r-menu-header">
            <img className="r-menu-header-icon" src={reperio}/>
            <div className="r-menu-header-text">
                <span>Reperio VM Provisioning</span>
            </div>
        </div>
        {props.authSession.isAuthenticated ? 
            <LinkContainer className="r-menu-item" to="/home"><Button bsStyle="link">Home</Button></LinkContainer>
            : null}
        {props.authSession.isAuthenticated ? 
            <LinkContainer className="r-menu-item" to="/virtual-machines"><Button bsStyle="link">Virtual Machines</Button></LinkContainer>
            : null}
        {props.authSession.isAuthenticated ? 
            <LinkContainer className="r-menu-item" to="/networks"><Button bsStyle="link">Networks</Button></LinkContainer>
            : null}
            {props.authSession.isAuthenticated ? 
            <LinkContainer className="r-menu-item" to="/edit-account"><Button bsStyle="link">Account</Button></LinkContainer>
            : null}
        {props.authSession.isAuthenticated ?
            <NavMenuLogOutLinkContainer/> 
            : <NavMenuLoginLink/>}
    </div>    
);

export default NavMenu;