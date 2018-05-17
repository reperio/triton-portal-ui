import React from 'react'
import { NavItem, Button } from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

const NavMenuLoginLink = () => (
    <LinkContainer className="r-menu-item" to="/login">
        <Button bsStyle="link">
            Login
        </Button>
    </LinkContainer>
);

export default NavMenuLoginLink;