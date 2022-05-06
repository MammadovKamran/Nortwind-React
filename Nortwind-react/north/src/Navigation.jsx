import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";

import CartSummary from "./CartSummary";

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" expand="md" light>
          <NavItem style={{ listStyleType: "none" }}>
            <Link to="/" className="m-2" style={{ color: "Rgba(0,0,0,.55)", textDecoration: "none" }}>
              Nortwind
            </Link>
          </NavItem>
          <NavItem style={{ listStyleType: "none" }}>
            <Link to="/cart" style={{ color: "Rgba(0,0,0,.55)", textDecoration: "none" }}>
              CartDetails
            </Link>
          </NavItem>
          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <CartSummary cart={this.props.cart} deleteToCard={this.props.deleteToCard} reduceQuantity={this.props.reduceQuantity} />
            </Nav>
            <NavItem style={{ listStyleType: "none" }}>
              <NavLink href="/signIn" style={{ color: "Rgba(0,0,0,.55)", textDecoration: "none" }}>
                Sign In
              </NavLink>
            </NavItem>
            <NavItem style={{ listStyleType: "none" }}>
              <NavLink href="/register" className="m-2" style={{ color: "Rgba(0,0,0,.55)", textDecoration: "none" }}>
                Sign Up
              </NavLink>
            </NavItem>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
