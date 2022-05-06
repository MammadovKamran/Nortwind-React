import React, { Component } from "react";
import { Badge, Button, Input } from "reactstrap";
import alertify from "alertifyjs";

export default class SignIn extends Component {
  state = {
    email: "",
    password: "",
    users: [],
  };

  handleChange(values, event) {
    console.log(values, event.target.value);
    this.setState({ [values]: event.target.value });
  }
  SignInUsers = () => {
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;
    this.checkUsers(emailInput, passwordInput);
    this.setState({ email: "", password: "" });
  };
  getUsers = () => {
    return fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => this.setState({ users: data }));
  };

  componentDidMount() {
    this.getUsers();
  }

  checkUsers = (userEmail, userPassword) => {
    let newState = [...this.state.users];
    console.log(newState);
    let suitableUser = newState.find((item) => item.email === userEmail && item.password === userPassword);
    if (suitableUser) {
      alertify.success("Entrance is successful");
      this.props.clearInput("email", "password");
    } else {
      alertify.error("Enter the details correctly");
    }
  };
  render() {
    return (
      <div>
        <Badge className="w-100">
          <h1>Sign In</h1>
        </Badge>

        <div style={{ height: "80vh" }} className="d-flex flex-column  align-items-center justify-content-center">
          <Input
            ref="email"
            placeholder="Email"
            value={this.state.email}
            onChange={(event) => {
              this.handleChange("email", event);
            }}
            id="email"
            className="w-50 mb-2"
          ></Input>

          <Input
            ref="password"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={(event) => {
              this.handleChange("password", event);
            }}
            id="password"
            className="w-50 mb-2"
          ></Input>
          <Button onClick={this.SignInUsers}>Sign In</Button>
        </div>
      </div>
    );
  }
}
