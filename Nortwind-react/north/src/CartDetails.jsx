import React, { Component } from "react";
import { Alert, Table, Button } from "reactstrap";

export default class CartDetails extends Component {
  renderNotEmpty = () => {
    return (
      <Table>
        <thead>
          <tr>
            <td>Product Id</td>
            <td>Product Name</td>
            <td>Quantity Per Unit</td>
            <td>Unit Price</td>
            <td>Units In Stock</td>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((item) => {
            console.log(item);
            return (
              <tr key={item.product.id}>
                <td>{item.quantity}</td>
                <td>{item.product.name}</td>
                <td>{item.product.quantity}</td>
                <td>{item.product.unitPrice}</td>
                <td>{item.product.unitsInStock}</td>
                <Button
                  className="bg-danger"
                  onClick={() => {
                    this.props.deleteToCard(item);
                  }}
                >
                  Remove
                </Button>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  renderEmpty = () => {
    return (
      <Alert color="danger">
        <h1>Empty Card</h1>
      </Alert>
    );
  };

  render() {
    return <div>{this.props.cart.length > 0 ? this.renderNotEmpty() : this.renderEmpty()}</div>;
  }
}
