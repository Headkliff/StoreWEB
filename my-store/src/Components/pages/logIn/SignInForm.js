import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./login.css";


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
        this.setState({ showError: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ showError: true });
      });
  };

  render() {
    return (
      <div>
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
      </div>
    );
  }
}
export default SignInForm;
