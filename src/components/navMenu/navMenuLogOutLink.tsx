import React from 'react'
import {NavItem} from "react-bootstrap";

const NavMenuLogOutLink = (props: any) => (
    <NavItem onClick={props.logout}>
        Log out
    </NavItem>
);

export default NavMenuLogOutLink;