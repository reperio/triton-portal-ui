import React from 'react'
import {NavItem, Button} from "react-bootstrap";

const NavMenuLogOutLink = (props: any) => (
    <Button className="r-menu-item" bsStyle="link" onClick={props.logout}>
        Log out
    </Button>
);

export default NavMenuLogOutLink;