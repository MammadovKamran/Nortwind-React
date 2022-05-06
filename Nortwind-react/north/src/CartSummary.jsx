import React, { Component } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Badge, NavItem, NavLink } from "reactstrap";
export default class CartSummary extends Component {
  renderNotEmptyCart = () => {
    return (
      <div>
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            Your Cart - {this.props.cart.length}
          </DropdownToggle>
          <DropdownMenu right={true}>
            {this.props.cart.map((item) => (
              <DropdownItem key={item.product.id}>
                <Badge
                  color="danger"
                  onClick={() => {
                    this.props.deleteToCard(item);
                  }}
                >
                  X
                </Badge>
                &nbsp;
                <Badge
                  color="primary"
                  onClick={() => {
                    this.props.reduceQuantity(item);
                  }}
                >
                  -
                </Badge>
                &nbsp;
                {item.product.name}
                &nbsp;
                <Badge color="primary">{item.quantity}</Badge>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };

  renderEmptyCart = () => {
    return (
      <div>
        <NavItem>
          <NavLink>Empty Cart</NavLink>
        </NavItem>
      </div>
    );
  };

  render() {
    return <div>{this.props.cart.length > 0 ? this.renderNotEmptyCart() : this.renderEmptyCart()}</div>;
  }
}
