import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { errorToast, successToast } from "../../../toasts/toast";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

const emailRegex = RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      secondName: "",
      password: "",
      newPassword: "",
      confirmNewPassword:"",
      formErrors: {
        email: "",
        firstName: "",
        secondName: "",
        password: "",
        newPassword: "",
        confirmNewPassword:''
      }
    };
    this.getUserInfo();
  }

  handleChange = e => {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "secondName":
        formErrors.secondName =
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
      case "newPassword":
        formErrors.newPassword =
          value.length < 8 ? "minimum 8 characaters required" : "";
        break;
      case "confirmNewPassword":
        formErrors.confirmNewPassword =
          value.length < 8 ? "minimum 8 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({
      [name]: value
    });
  };

  handleDataSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      const newUserData = {
        email: this.state.email,
        firstName: this.state.firstName,
        secondName: this.state.secondName
      };

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
    } else {
      errorToast("Invalid user data");
    }
  };

  handleSubmitPass=e=>{
    e.preventDefault();
    if(this.state.newPassword===this.state.confirmNewPassword){
      const data = {
        password: this.state.password,
        newPassword: this.state.newPassword,
      };
      axios
        .post("https://localhost:44326/api/User/changePass", data, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
        .then(res => {
          successToast("New password set")
        })
        .catch(error => {
          errorToast("Wrong password")
        });
    }
    else{
      errorToast("Passwords must match")
    }
  }

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
      const { formErrors } = this.state;
      return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 align="center">User info editing</h4>
            </div>
            <form onSubmit={this.handleDataSubmit}>
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
                      className={
                        "form-control " +
                        (formErrors.firstName.length > 0 ? "is-invalid" : null)
                      }
                      id="firstName"
                      name="firstName"
                      formNoValidate
                      required
                      placeholder={this.state.firstName}
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                    {formErrors.firstName.length > 0 && (
                      <span className="errorMessage">
                        {formErrors.firstName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="secondName"
                    className="col-sm-2 col-form-label"
                  >
                    Second Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={
                        "form-control " +
                        (formErrors.secondName.length > 0 ? "is-invalid" : null)
                      }
                      id="secondName"
                      required
                      name="secondName"
                      formNoValidate
                      placeholder={this.state.secondName}
                      value={this.state.secondName}
                      onChange={this.handleChange}
                    />
                    {formErrors.secondName.length > 0 && (
                      <span className="errorMessage">
                        {formErrors.secondName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="Email" className="col-sm-2 col-form-label">
                    Email:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className={
                        "form-control " +
                        (formErrors.email.length > 0 ? "is-invalid" : null)
                      }
                      id="email"
                      name="email"
                      formNoValidate
                      required
                      placeholder={this.state.email}
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    {formErrors.email.length > 0 && (
                      <span className="invalid-feedback">
                        {formErrors.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="FormField">
                <button type="submit" className="btn btn-primary">
                  Submit Edits
                </button>
              </div>
            </form>

            <form onSubmit={this.handleSubmitPass}>
              <div align="center">
                <div className="form-group row">
                  <label htmlFor="password" className="col-sm-2 col-form-label">
                    Password:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className={
                        "form-control " +
                        (formErrors.password === null ? "is-invalid" : null)
                      }
                      id="password"
                      name="password"
                      required
                      formNoValidate
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    {formErrors.password === null && (
                      <span className="errorMessage">
                        {formErrors.password}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="newPassword"
                    className="col-sm-2 col-form-label"
                  >
                    New Password:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className={
                        "form-control " +
                        (formErrors.newPassword === null ? "is-invalid" : null)
                      }
                      id="newPassword"
                      name="newPassword"
                      required
                      formNoValidate
                      value={this.state.newPassword}
                      onChange={this.handleChange}
                    />
                    {formErrors.newPassword === null && (
                      <span className="errorMessage">
                        {formErrors.newPassword}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                    <label
                      htmlFor="confirmNewPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Confirm Password:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        className={
                          "form-control " +
                          (formErrors.confirmNewPassword === null
                            ? "is-invalid"
                            : null)
                        }
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        required
                        formNoValidate
                        value={this.state.confirmNewPassword}
                        onChange={this.handleChange}
                      />
                      {formErrors.confirmNewPassword === null && (
                        <span className="errorMessage">
                          {formErrors.confirmNewPassword}
                        </span>
                      )}
                    </div>
                  </div>
              </div>
              <div className="FormField">
                <button type="submit" className="btn btn-primary">
                  Chenge Password
                </button>
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
