import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./login.css";
import { errorToast } from "../../toasts/toast";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { login } from "../../../Actions/userActionCreaters";
import { compose } from "redux";

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: "",
      showError: false
    };
  }

  handleChange = e => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

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

    axios
      .post("https://localhost:44326/api/Login/login", user)
      .then(res => {
        localStorage.setItem("token", res.data);
        localStorage.setItem("nickname", this.state.nickname);
        this.setState({ showError: false });
        this.props.userlogin(this.state.nickname);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ showError: true });
        errorToast("Check your Login or (and) Password");
      });
  };

  render() {
    return (
      <div>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                name="nickname"
                onChange={this.handleChange}
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="FormField">
              <div>
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
                <NavLink to="/registration" className="Link ml-2">
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
