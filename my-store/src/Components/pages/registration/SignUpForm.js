import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { login } from "../../../Actions/userActionCreaters";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast } from "../../toasts/toast";
import ModalConfirm from "../../Modal/ModalConfirm";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      secondName: "",
      formErrors: {
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        secondName: ""
      }
    };
  }

  handleChange = e => {
    e.preventDefault();
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "nickname":
        formErrors.nickname =
          value.length < 4 ? "minimum 4 characaters required" : "";
        break;
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 8 ? "minimum 8 characaters required" : "";
        break;
      case "confirmPassword":
        formErrors.confirmPassword =
          value.length < 8 ? "minimum 8 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state) && (this.state.password === this.state.confirmPassword)) {
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
          localStorage.setItem("token", res.data);
          this.props.userlogin(this.state.nickname);
          this.props.history.push("/");
        })
        .catch(error => {
          errorToast("Something went wrong");
        });
    } else {
      errorToast("Check your data");
    }
  };

  render() {
    const { formErrors } = this.state;
    return (
      <>
        <ModalConfirm
          text="Are you sure of the data entered?"
          submit={this.handleSubmit}
        />
        <div className="container">
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_RIGHT}
          />
          <div className="form-group">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-4 form-group">
                  <label htmlFor="nickname">Nickname</label>
                  <input
                    type="text"
                    className={
                      "form-control " +
                      (formErrors.nickname.length > 0 ? "is-invalid" : null)
                    }
                    id="nickname"
                    required
                    placeholder="Enter your nickname"
                    name="nickname"
                    noValidate
                    value={this.state.nickname}
                    onChange={this.handleChange}
                  />
                  {formErrors.nickname.length > 0 && (
                    <span className="invalid-feedback">
                      {formErrors.nickname}
                    </span>
                  )}
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
                      "form-control " +
                      (formErrors.email.length > 0 ? "is-invalid" : null)
                    }
                    placeholder="Enter your email"
                    noValidate
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  {formErrors.email.length > 0 && (
                    <span className="invalid-feedback">{formErrors.email}</span>
                  )}
                </div>
              </div>
              <div className="row ">
                <div className="col-6 form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    required
                    minLength="8"
                    maxLength="16"
                    className={
                      "form-control " +
                      (formErrors.password.length > 0 ? "is-invalid" : null)
                    }
                    placeholder="Enter your password"
                    name="password"
                    noValidate
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                  )}
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="confirmPassword">Confirm your password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    minLength="8"
                    maxLength="16"
                    className={
                      "form-control " +
                      (formErrors.confirmPassword.length > 0
                        ? "is-invalid"
                        : null)
                    }
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    noValidate
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                  {formErrors.confirmPassword.length > 0 && (
                    <span className="errorMessage">
                      {formErrors.confirmPassword}
                    </span>
                  )}
                </div>{" "}
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    maxLength="25"
                    className={
                      "form-control " +
                      (formErrors.firstName.length > 0 ? "is-invalid" : null)
                    }
                    placeholder="Enter your First Name"
                    name="firstName"
                    noValidate
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    required
                  />
                  {formErrors.firstName.length > 0 && (
                    <span className="errorMessage">{formErrors.firstName}</span>
                  )}
                </div>

                <div className="col-6 form-group">
                  <label htmlFor="secondName">Second Name</label>
                  <input
                    type="text"
                    id="secondName"
                    maxLength="25"
                    className={
                      "form-control " +
                      (formErrors.secondName.length > 0 ? "is-invalid" : null)
                    }
                    placeholder="Enter your Second Name"
                    name="secondName"
                    noValidate
                    value={this.state.secondName}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#submitModal"
                  >
                    Sign Up
                  </button>
                  <NavLink to="/login" className="Link ml-2" align="right">
                    I'm already member
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
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
