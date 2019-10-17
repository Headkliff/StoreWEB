import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { login } from "../../Actions/userActionCreaters";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast } from "../../Components/Toasts/Toast";



class SignUpForm extends Component {
    state = {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      secondName: "",
    };

  handleChange = e => {
    e.preventDefault();
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.password === this.state.confirmPassword
    ) {
      const user = {
        nickname: this.state.nickname,
        password: this.state.password,
        firstName: this.state.firstName,
        secondName: this.state.secondName,
        email: this.state.email
      };

      axios
        .post("https://localhost:44326/api/login/registration", user)
        .then(res => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("nickname", this.state.nickname)
          localStorage.setItem("role", res.data.user.role)
          this.props.userlogin(this.state.nickname, res.data.user.role);
          this.props.history.push("/");
        })
        .catch(error => {
          errorToast(error.response.data.message);
        });
    } else {
      errorToast("Passwords dosn't match!");
    }
  };

  render() {
    return (
      <>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_LEFT}
        />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="row">
                <div className="col-4 form-group">
                  <label htmlFor="nickname">Nickname</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={
                        "form-control " 
                        
                      }
                      id="nickname"
                      required
                      minLength='4'
                      placeholder="Enter your nickname"
                      name="nickname"
                      formNoValidate
                      value={this.state.nickname}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-8 form-group">
                  <label className="Label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={
                      "form-control " 
                    }
                    formNoValidate
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-6 form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    required
                    minLength='8'
                    className={
                      "form-control " 
                    }
                    placeholder="Enter your password"
                    name="password"
                    formNoValidate
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="confirmPassword">Confirm your password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    minLength='8'
                    className={
                      "form-control " 
                    }
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    formNoValidate
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className={
                      "form-control " 
                    }
                    placeholder="Enter your First Name"
                    name="firstName"
                    formNoValidate
                    onChange={this.handleChange}
                    value={this.state.firstName}
                    required
                    minLength='4'
                  />
                  
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="secondName">Second Name</label>
                  <input
                    type="text"
                    id="secondName"
                    className={
                      "form-control "
                    }
                    placeholder="Enter your Second Name"
                    name="secondName"
                    formNoValidate
                    value={this.state.secondName}
                    onChange={this.handleChange}
                    required
                    minLength='4'
                  />
                </div>
              </div>
              <div>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                  <NavLink to="/login" className="Link ml-2" align="right">
                    I'm already member
                  </NavLink>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userlogin: (nickname,role) => {
    dispatch(login(nickname,role));
  }
});

export default compose(
  connect(
    undefined,
    mapDispatchToProps
  )(SignUpForm)
);
