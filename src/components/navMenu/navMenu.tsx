import React from 'react'
import { Button, Navbar, Nav, NavItem, MenuItem } from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";
import ReperioBar from '../misc/reperioBar';

const reperio = require('../../assets/reperio-rAsset-31.png');

const NavMenu = (props: any) => (
    <div className="nav-menu-container navbar-fixed-top">
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <img className="r-menu-header-icon" src={reperio}/>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                {props.authSession.isAuthenticated ? 
                    <LinkContainer className={props.location === '/home' ? 'r-menu-item r-menu-item-active' : 'r-menu-item'} to="/home">
                        <Button onClick={() => props.navigateTo('/home')} bsStyle="link">Home</Button>
                    </LinkContainer>
                    : null}

                {props.authSession.isAuthenticated ? 
                    <LinkContainer className={props.location === '/virtual-machines' ? 'r-menu-item r-menu-item-active' : 'r-menu-item'} to="/virtual-machines">
                        <Button onClick={() => props.navigateTo('/virtual-machines')} bsStyle="link">Virtual Machines</Button>
                    </LinkContainer>
                    : null}

                {props.authSession.isAuthenticated ? 
                    <LinkContainer className={props.location === '/networks' ? 'r-menu-item r-menu-item-active' : 'r-menu-item'} to="/networks">
                        <Button onClick={() => props.navigateTo('/networks')} bsStyle="link">Networks</Button>
                    </LinkContainer>
                    : null}

                    {props.authSession.isAuthenticated ? 
                    <LinkContainer className={props.location === '/edit-account' ? 'r-menu-item r-menu-item-active' : 'r-menu-item'} to="/edit-account">
                        <Button onClick={() => props.navigateTo('/edit-account')} bsStyle="link">Account</Button>
                    </LinkContainer>
                    : null}

                {props.authSession.isAuthenticated ?
                    <Button onClick={props.logout} className="r-menu-item" bsStyle="link">Log out</Button>
                :
                    <LinkContainer className={props.location === '/login' ? 'r-menu-item r-menu-item-active' : 'r-menu-item'} to="/login">
                        <Button onClick={() => props.navigateTo('/login')} bsStyle="link">Login</Button>
                    </LinkContainer>
                }
            </Nav>
        </Navbar>
        <ReperioBar />
    </div>
    
);

export default NavMenu;