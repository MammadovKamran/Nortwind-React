import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import Navigation from "./Navigation";
import Categories from "./Categories";
import Products from "./Products";
import CartDetails from "./CartDetails";
import NotFound from "./NotFound";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import alertify from "alertifyjs";
import { Routes, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    currentCategory: {},
    products: [],
    cart: [],
  };
  setCurrentCategory = (paramsCategory) => {
    this.setState({ currentCategory: paramsCategory });
    this.getProducts(paramsCategory.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += `/?categoryId=${categoryId}`;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  componentDidMount() {
    this.getProducts();
  }

  addToCard = (paramsProduct) => {
    let newState = [...this.state.cart];

    let addedItem = newState.find((item) => item.product.id === paramsProduct.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newState.push({ product: paramsProduct, quantity: 1 });
    }
    this.setState({ cart: newState });
    alertify.success(`${paramsProduct.name} added to card`);
    console.log(newState);
  };

  clearInput = (email, password, name) => {
    if (email && password && name) {
      document.getElementById(name).value = "";
      document.getElementById(email).value = "";
      document.getElementById(password).value = "";
    } else if (email && password) {
      document.getElementById(email).value = "";
      document.getElementById(password).value = "";
    }
  };

  _deleteToCard = (deletedProduct) => {
    let newState = [...this.state.cart];
    newState.map((item) => {
      if (item.product.id === deletedProduct.product.id) {
        const index = newState.indexOf(deletedProduct);

        if (index > -1) {
          newState.splice(index, 1);
        }

        this.setState({ cart: newState });
        alertify.error(`${deletedProduct.quantity}   
        ${deletedProduct.product.name} deleted to card`);
      }
    });
  };

  reduceQuantity = (productPrams) => {
    let newState = [...this.state.cart];

    newState.map((item) => {
      if (item.product.id === productPrams.product.id) {
        if (productPrams.quantity > 1) {
          productPrams.quantity--;

          alertify.error(`${productPrams.product.name}  was reduced by 1 piece. You have 
          ${productPrams.quantity}  ${productPrams.product.name} `);
        } else {
          alertify.error("Press the X button to delete the product from card");
        }

        this.setState({ cart: newState });
      }
    });
  };

  render() {
    return (
      <div>
        <Container>
          <Navigation cart={this.state.cart} deleteToCard={this.deleteToCard} reduceQuantity={this.reduceQuantity} />
          <Row>
            <Col xs="3">
              <Categories currentCategory={this.state.currentCategory} setCurrentCategory={this.setCurrentCategory} />
            </Col>
            <Col xs="9">
              <Routes>
                <Route exact path="/" element={<Products addToCard={this.addToCard} products={this.state.products} currentCategory={this.state.currentCategory} />} />

                <Route path="/cart" element={<CartDetails cart={this.state.cart} deleteToCard={this.deleteToCard} reduceQuantity={this.reduceQuantity} />} />

                <Route path="/register" element={<SignUp clearInput={this.clearInput} />} />

                <Route path="/SignIn" element={<SignIn clearInput={this.clearInput} />} />

                <Route element={<NotFound />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
