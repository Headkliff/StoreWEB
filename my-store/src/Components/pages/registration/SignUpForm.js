import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./register.css";

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      nickname: "",
      email: "",
      password: "",
      firstName: "",
      secondName: ""
    };
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      nickname: this.state.nickname,
      password: this.state.password,
      firstName: this.state.firstName,
      secondName: this.state.secondName,
      email: this.state.email
    };
    console.log("The form was submitted with the following data:");
    console.log(this.state);

    axios.post("https://localhost:44326/api/register", user).then(res => {
      localStorage.setItem("token", res.data);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron jumbotron-fluid">
          <form onSubmit={this.handleSubmit}>
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label for="nickname" htmlFor="nickname">
                  Nickname
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nickname"
                  required
                  minLength="4"
                  maxLength={16}
                  placeholder="Enter your nickname"
                  name="nickname"
                  value={this.state.nickname}
                  onChange={e => this.handleChange(e)}
                />
              </div>

              <div class="col-md-4 mb-3">
                <label for="email" className="Label" htmlFor="Email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="form-control"
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={e => this.handleChange(e)}
                />
              </div>

              <div class="col-md-4 mb-3">
                <label for="password" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  minLength="8"
                  maxLength="16"
                  className="form-control"
                  placeholder="Enter your password"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="firstName" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  maxLength="25"
                  className="form-control"
                  placeholder="Enter your First Name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={e => this.handleChange(e)}
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="secondName" htmlFor="secondName">
                  Second Name
                </label>
                <input
                  type="text"
                  id="secondName"
                  maxLength="25"
                  className="form-control"
                  placeholder="Enter your Second Name"
                  name="secondName"
                  value={this.state.secondName}
                  onChange={e => this.handleChange(e)}
                  required
                />
              </div>
            </div>

            <div className="FormField">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>{" "}
              <NavLink to="/login" className="Link">
                I'm already member
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default SignUpForm;
