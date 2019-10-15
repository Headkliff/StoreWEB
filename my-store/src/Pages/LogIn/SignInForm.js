import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./login.css";
import { errorToast } from "../../Components/Toasts/Toast";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { login } from "../../Actions/userActionCreaters";
import { compose } from "redux";

class SignInForm extends Component {
  state = {
    nickname: "",
    password: "",
    passwordCorrect: false,
    nicknameCorrect: false
  };

  handleChange = e => {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "nickname") {
      if (target.value.length > 4) {
        this.setState({ nicknameCorrect: true });
      } else {
        this.setState({ nicknameCorrect: false });
      }
    }
    if (name === "password") {
      if (target.value.length > 7) {
        this.setState({ passwordCorrect: true });
      } else {
        this.setState({ passwordCorrect: false });
      }
    }

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      nickname: this.state.nickname,
      password: this.state.password
    };
    if (this.state.passwordCorrect && this.state.nicknameCorrect) {
      axios
        .post("https://localhost:44326/api/Login/login", user)
        .then(res => {
          localStorage.setItem("token", res.data);
          localStorage.setItem("nickname", this.state.nickname);
          this.props.userlogin(this.state.nickname);
          this.props.history.push("/");
        })
        .catch(error => {
          errorToast("Check your Login or (and) Password");
        });
    } else {
      errorToast("Fill all inputs");
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
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control "
                placeholder="Username"
                aria-describedby="basic-addon1"
                id="nickname"
                name="nickname"
                formNoValidate
                required
                minLength="4"
                value={this.state.nickname}
                onChange={this.handleChange}
              />
            </div>

            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control "
                placeholder="Password"
                aria-describedby="basic-addon2"
                name="password"
                formNoValidate
                required
                minLength="8"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="FormField">
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                >
                  Login
                </button>
                <NavLink to="/registration" className="Link ml-2">
                  Create an account
                </NavLink>
              </div>
            </div>
          </form>
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
    //mapStateToProps,
    undefined,
    mapDispatchToProps
  )(SignInForm)
);
