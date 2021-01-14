import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../actions/auth'

export default function Header() {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout())
  } 

  // this will render signout button
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={ logout }>
            Signout
          </span>
        </li>
      </Nav>
    );
  };

  // this will render signin & signnout links
  const renderNotLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Sign In
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Sign Up
          </NavLink>
        </li>
      </Nav>
    );
  }

  return (
    <Navbar
      style={{ zIndex: 1 }}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
        <Link to="/" className="navbar-brand">
          Ranmal Dashbaord
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {auth.authenticate ? renderLoggedInLinks(): renderNotLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
