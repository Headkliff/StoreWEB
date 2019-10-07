import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      secondName: ""
    };
    this.getUserInfo();
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
    const newUserData = {
      email: this.state.email,
      firstName: this.state.firstName,
      secondName: this.state.secondName
    };
    console.log(newUserData);

    axios
      .post("https://localhost:44326/api/User/edit", newUserData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res => {
        localStorage.setItem("token", res.data);
        this.props.history.push("/user");
      })
      .catch(error => {
        console.log(error);
      });
  };

  getUserInfo() {
    axios
      .get("https://localhost:44326/api/user", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res => {
        this.setState({
          email: res.data.email,
          firstName: res.data.firstName,
          secondName: res.data.secondName
        });
      })
      .catch(function() {
        this.props.history.push("/notfound");
      });
  }

  userEdit() {
    if (!!this.props.isAuthorized) {
      return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 align="center">User info editing</h4>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div align="center">
                <div className="form-group row">
                  <label
                    htmlFor="firstName"
                    className="col-sm-2 col-form-label"
                  >
                    First Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      minLength="4"
                      maxLength="25"
                      placeholder={this.state.firstName}
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="inputSecondName"
                    className="col-sm-2 col-form-label"
                  >
                    Second Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="secondName"
                      name="secondName"
                      minLength="4"
                      maxLength="25"
                      placeholder={this.state.secondName}
                      value={this.state.secondName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="Email" className="col-sm-2 col-form-label">
                    Email:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder={this.state.email}
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="FormField">
                <div align="center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="jumbotron jumbotron">
          <div className="container">
            <div className="alert alert-danger" role="alert">
              <span>You are not authorized </span>
              <Link to="login" className="alert-link">
                Login
              </Link>
              <span> or </span>
              <Link to="/registration" className="alert-link">
                Register
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.userEdit()}</div>;
  }
}

const mapStateToProps = state => ({
  nickname: state.user.nickname,
  isAuthorized: state.user.authorized
});

export default compose(connect(mapStateToProps)(EditUser));
