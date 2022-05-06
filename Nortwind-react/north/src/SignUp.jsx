import alertify from "alertifyjs";
import React, { Component } from "react";
import { Badge, Button, Input } from "reactstrap";

export default class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  handleChange(values, event) {
    console.log(values, event.target.value);
    this.setState({ [values]: event.target.value });
  }
  signUpUser = () => {
    let nameInput = document.getElementById("name").value;
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;
    if (nameInput.length > 0 && emailInput.length > 0 && passwordInput.length > 0) {
      this.postData();
      this.props.clearInput("email", "password", "name");
      this.setState({ email: "", password: "", name: "" });
    } else {
      alertify.error("Please fill in the input");
    }
  };

  postData = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };
    fetch("http://localhost:3000/users", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  render() {
    return (
      <div>
        <Badge className="w-100">
          <h1>Sign Up</h1>
        </Badge>
        <div style={{ height: "80vh" }} className="d-flex flex-column  align-items-center justify-content-center">
          <Input
            placeholder="Nickname"
            value={this.state.name}
            onChange={(event) => {
              this.handleChange("name", event);
            }}
            id="name"
            className="w-50 mb-2"
          ></Input>

          <Input
            placeholder="Email"
            value={this.state.email}
            onChange={(event) => {
              this.handleChange("email", event);
            }}
            id="email"
            className="w-50 mb-2"
          ></Input>

          <Input
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={(event) => {
              this.handleChange("password", event);
            }}
            id="password"
            className="w-50 mb-2"
          ></Input>
          <Button onClick={this.signUpUser}>Sign Up</Button>
        </div>
      </div>
    );
  }
}
