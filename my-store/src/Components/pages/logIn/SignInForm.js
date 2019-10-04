import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./login.css";
import { errorToast } from "../../../toasts/toast";
import { ToastsContainer, ToastsStore } from "react-toasts";
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
      .post("https://localhost:44326/api/Login", user)
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
        <ToastsContainer store={ToastsStore} />
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
                <div className="FormField">
                  <div>
                    <ul className="nav justify-content-end">
                      <li>
                        <button type="submit" className="btn btn-primary">
                          Sign In
                        </button>
                      </li>
                      <li>
                        <NavLink to="/registration" className="Link">
                          Create an account
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </div>
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
