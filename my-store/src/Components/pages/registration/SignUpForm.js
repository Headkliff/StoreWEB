import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { login } from "../../../Actions/userActionCreaters";
import { compose } from "redux";
import { connect } from "react-redux";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { errorToast } from "../../../toasts/toast";

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
      password: this.state.password,
      firstName: this.state.firstName,
      secondName: this.state.secondName,
      email: this.state.email
    };

    axios
      .post("https://localhost:44326/api/register", user)
      .then(res => {
        localStorage.setItem("token", res.data);
        this.props.userlogin(this.state.nickname);
        this.props.history.push("/");
      })
      .catch(function(error) {
        errorToast("User with this Nickname alrady exist")
      });
  }

  render() {
    return (
      <div className="container">
        <ToastsContainer store={ToastsStore} />
        <div className="jumbotron jumbotron-fluid">
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="col-md-4 mb-3">
                <label htmlFor="nickname">Nickname</label>
                <input
                  type="text"
                  className="form-control"
                  id="nickname"
                  required
                  minLength="4"
                  maxLength="16"
                  placeholder="Enter your nickname"
                  name="nickname"
                  value={this.state.nickname}
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="Label" htmlFor="email">
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
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="password">Password</label>
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
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  maxLength="25"
                  className="form-control"
                  placeholder="Enter your First Name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="secondName">Second Name</label>
                <input
                  type="text"
                  id="secondName"
                  maxLength="25"
                  className="form-control"
                  placeholder="Enter your Second Name"
                  name="secondName"
                  value={this.state.secondName}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="FormField">
              <div>
                <ul className="nav justify-content-end">
                  <li>
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>{" "}
                  </li>
                  <li>
                    <NavLink to="/login" className="Link" align="right">
                      I'm already member
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  userlogin: nickname => {
    dispatch(login(nickname));
  }
});

export default compose(
  connect(
    undefined,
    mapDispatchToProps
  )(SignUpForm)
);
