import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { compose } from "redux";
import { errorToast, successToast } from "../../../Components/Toasts/Toast";
import UnAuthorize from "../../../Components/UnAuthorize/UnAuthorize";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      secondName: "",
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    };
    this.getUserInfo();
  }

  handleChange = e => {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleDataSubmit = e => {
    e.preventDefault();
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
        successToast("New data set");
        this.userData();
      })
      .catch(error => {
        errorToast(error.response.data.message);
      });
  };

  handleSubmitPass = e => {
    e.preventDefault();
    if (this.state.newPassword === this.state.confirmNewPassword) {
      const password = {
        password: this.state.password,
        newPassword: this.state.newPassword
      };
      console.log(password);
      axios
        .post("https://localhost:44326/api/User/changePass", password, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
        .then(res => {
          successToast("New password set");
        })
        .catch(error => {
          errorToast(error.response.data.message);
        });
    } else {
      errorToast("Passwords must match");
    }
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
      .catch(errors => {
        this.props.history.push("/login");
      });
  }

  userData() {
    return (
      <form onSubmit={this.handleDataSubmit}>
        <div>
          <div className="form-group row">
            <label htmlFor="firstName" className="col-sm-2 col-form-label">
              First Name:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className={"form-control "}
                id="firstName"
                name="firstName"
                formNoValidate
                required
                placeholder={this.state.firstName}
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="secondName" className="col-sm-2 col-form-label">
              Second Name:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className={"form-control "}
                id="secondName"
                required
                name="secondName"
                formNoValidate
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
                className={"form-control "}
                id="email"
                name="email"
                formNoValidate
                required
                placeholder={this.state.email}
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="FormField">
          <button type="submit" className="btn btn-primary">
            Submit Edits
          </button>
        </div>
      </form>
    );
  }
  userPassword() {
    return (
      <form onSubmit={this.handleSubmitPass}>
        <div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password:
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className={"form-control "}
                id="password"
                name="password"
                required
                formNoValidate
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="newPassword" className="col-sm-2 col-form-label">
              New Password:
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className={"form-control "}
                id="newPassword"
                name="newPassword"
                required
                formNoValidate
                value={this.state.newPassword}
                onChange={this.handleChange}
              />
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
                className={"form-control "}
                id="confirmNewPassword"
                name="confirmNewPassword"
                required
                formNoValidate
                value={this.state.confirmNewPassword}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="FormField">
          <button type="submit" className="btn btn-primary">
            Chenge Password
          </button>
        </div>
      </form>
    );
  }

  userEdit() {
    if (this.props.isAuthorized) {
      return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 align="center">User info editing</h4>
            </div>
            {this.userData()}
            {this.userPassword()}
          </div>
        </div>
      );
    } else {
      return <UnAuthorize></UnAuthorize>;
    }
  }

  render() {
    return (
      <div>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_LEFT}
        />
        {this.userEdit()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nickname: state.user.nickname,
  isAuthorized: state.user.authorized
});

export default compose(connect(mapStateToProps)(EditUser));
