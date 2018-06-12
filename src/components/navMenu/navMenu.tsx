import React from 'react'
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReperioBar from '../misc/reperioBar';
import ReperioBarContainer from '../../containers/misc/reperioBarContainer';
const reperio = require('../../assets/reperio-rAsset-31.png');

const NavMenu = (props: any) => (
    <div className="nav-menu-container">
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <img className="r-menu-header-icon" src={reperio}/>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                {props.authSession.isAuthenticated ? 
                    <LinkContainer activeClassName="active" className='r-menu-item' to="/home">
                        <NavItem onClick={() => props.navigateTo('/home')}>Home</NavItem>
                    </LinkContainer>
                    : null}

                {props.authSession.isAuthenticated ? 
                    <LinkContainer activeClassName="active" className='r-menu-item' to="/virtual-machines">
                        <NavItem onClick={() => props.navigateTo('/virtual-machines')}>Virtual Machines</NavItem>
                    </LinkContainer>
                    : null}

                {props.authSession.isAuthenticated ? 
                    <LinkContainer activeClassName="active" className='r-menu-item' to="/networks">
                        <NavItem onClick={() => props.navigateTo('/networks')}>Networks</NavItem>
                    </LinkContainer>
                    : null}

                    {props.authSession.isAuthenticated ? 
                    <LinkContainer activeClassName="active" className='r-menu-item' to="/edit-account">
                        <NavItem onClick={() => props.navigateTo('/edit-account')}>Account</NavItem>
                    </LinkContainer>
                    : null}

                {props.authSession.isAuthenticated ?
                    <NavItem onClick={props.logout} className="r-menu-item">Log out</NavItem>
                :
                    <LinkContainer activeClassName="active" className='r-menu-item' to="/login">
                        <NavItem onClick={() => props.navigateTo('/login')}>Login</NavItem>
                    </LinkContainer>
                }
            </Nav>
        </Navbar>
        <ReperioBarContainer />
    </div>
    
);

export default NavMenu;