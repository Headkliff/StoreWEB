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
import * as bootstrapValidate from "bootstrap-validate";
window.bootstrapValidate = bootstrapValidate;

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: "",
      passwordCorrect:false,
      nicknameCorrect:false
    };
  }

  handleChange = e => {
    e.preventDefault();
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    bootstrapValidate(
      "#nickname",
      "min:5:Your name must  be longer than 5 characters|required|alphanum"
    );
    bootstrapValidate('#password', "min:5:Your name must  be longer than 5 characters|required", function(isValid) {
      if (isValid) {
        this.setState({passwordCorrect:true})
      }else{
        this.setState({passwordCorrect:false})
      }})

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
    console.log("start");
    if(this.state.passwordCorrect && this.state.nicknameCorrect){
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
      } else {
        console.log("false");
        errorToast("Fill all inputs");
      }
  };

  render() {
    return (
      <>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                // required
                // minLength='5'
                className="form-control "
                placeholder="Username"
                aria-describedby="basic-addon1"
                id="nickname"
                name="nickname"
                value={this.state.nickname}
                onChange={this.handleChange}
              />
            </div>

            <div className="input-group mb-3">
              <input
                type="password"
                className={"form-control "}
                formNoValidate
                // required
                // minLength="8"
                placeholder="Password"
                aria-describedby="basic-addon2"
                name="password"
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
                  Sign In
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
