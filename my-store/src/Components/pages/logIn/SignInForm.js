import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./login.css";

class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      nickname: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      password: this.state.password
    };
    console.log("The form was submitted with the following data:");
    console.log(this.state);

    axios
      .post("https://localhost:44326/api/Login", user)
      .then(res => {
        localStorage.setItem("token", res.data);
        console.log(res.data);
      })
      .catch(function(error) {
        if (error === 401) {
          alert("You are not exist");
        }
      });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron jumbotron-fluid">
          <form onSubmit={this.handleSubmit}>
            <div>
              <div className="form-group">
                <label className="exampleInputEmail1" htmlFor="nickname">
                  Nickname
                </label>
                <input
                  type="text"
                  aria-describedby="emailHelp"
                  id="nickname"
                  required
                  maxLength="16"
                  className="form-control"
                  placeholder="Enter your nickname"
                  name="nickname"
                  value={this.state.nickname}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  minLength="8"
                  maxLength="16"
                  placeholder="Enter your password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
                <NavLink to="/registration" className="Link">
                  Create an account
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default SignInForm;
