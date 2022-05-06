import React, { Component } from "react";
import { Badge, ListGroup, ListGroupItem } from "reactstrap";

export default class Categories extends Component {
  state = {
    categories: [],
  };
  getCategtories = () => {
    return fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };
  componentDidMount() {
    this.getCategtories();
  }
  render() {
    return (
      <div>
        <h1>
          <Badge color="primary" className="w-100">
            Categories
          </Badge>
        </h1>
        <ListGroup>
          {this.state.categories.map((category) => {
            return (
              <ListGroupItem
                active={this.props.currentCategory.id === category.id}
                onClick={() => {
                  this.props.setCurrentCategory(category);
                }}
                key={category.id}
              >
                {category.name}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}
