import React from 'react'
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

import NavMenuLoginLink from "./navMenuLoginLink";
import NavMenuLogOutLinkContainer from "../../containers/navMenuLogOutLinkContainer";
const reperio = require('../../assets/reperio-rAsset-31.png');

const NavMenu = (props: any) => (
    <div className="r-nav-menu">
        <div className="r-menu-header">
            <img className="r-menu-header-icon" src={reperio}/>
            <div className="r-menu-header-text">
                <span>Reper.io Backups</span>
            </div>
        </div>
        {props.authSession.isAuthenticated ? 
            <div className="r-menu-item">
                <LinkContainer to="/home"><NavItem>Home</NavItem></LinkContainer>
            </div> : null}
        {props.authSession.isAuthenticated ? 
            <div className="r-menu-item">
                <LinkContainer to="/virtual-machines"><NavItem>Virtual Machines</NavItem></LinkContainer> 
            </div> : null}
        <div className="r-menu-item">
            {props.authSession.isAuthenticated ? <NavMenuLogOutLinkContainer/> : <NavMenuLoginLink/>}
        </div>
    </div>
    /*<Navbar className="navContainer">
        <Nav>
            {props.authSession.isAuthenticated ? <LinkContainer to="/home"><NavItem>Home</NavItem></LinkContainer> : null}
            {props.authSession.isAuthenticated ? <LinkContainer to="/virtual-machines"><NavItem>Virtual Machines</NavItem></LinkContainer> : null}
            {props.authSession.isAuthenticated ? <NavMenuLogOutLinkContainer/> : <NavMenuLoginLink/>}
        </Nav>
    </Navbar> 
    
    
    ${activeRoute === 'home' ? 'r-menu-item-active' : ''}

    */
    
);

export default NavMenu;