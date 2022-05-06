import React, { Component } from "react";
import { Badge, Button, Table } from "reactstrap";

export default class Products extends Component {
  render() {
    return (
      <div>
        <h1>
          <Badge color="danger" className="w-100">
            Products-{this.props.currentCategory.name}
          </Badge>
        </h1>
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
            {this.props.products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.quantityPerUnit}</td>
                  <td>{product.unitPrice}</td>
                  <td>{product.unitsInStock}</td>
                  <Button
                    onClick={() => {
                      this.props.addToCard(product);
                    }}
                    color="danger"
                    outline
                  >
                    Add
                  </Button>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
