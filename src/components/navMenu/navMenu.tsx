import React from 'react'
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

import NavMenuLoginLink from "./navMenuLoginLink";
import NavMenuLogOutLinkContainer from "../../containers/navMenuLogOutLinkContainer";

const NavMenu = (props: any) => (
    <Navbar>
        <Nav>
            {props.authSession.isAuthenticated ? <LinkContainer to="/home"><NavItem>Home</NavItem></LinkContainer> : null}
            /*({props.authSession.isAuthenticated ? <LinkContainer to="/garage-doors"><NavItem>Garage doors</NavItem></LinkContainer> : null} */
            {props.authSession.isAuthenticated ? <NavMenuLogOutLinkContainer/> : <NavMenuLoginLink/>}
        </Nav>
    </Navbar>
);

export default NavMenu;