import React from "react";
import axios from "axios";

class User extends React.Component {
  constructor() {
    super();
    this.getUserInfo();
    this.state = {
      nickname: "",
      email: "",
      firstName: "",
      secondName: "",
      authorize: false
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

  getUserInfo() {
    axios
      .get("https://localhost:44326/api/user", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res => {
        this.setState({
          authorize: true,
          nickname: res.data.nickname,
          email: res.data.email,
          firstName: res.data.firstName,
          secondName: res.data.secondName
        });
      })
      .catch(function(error) {
        if (error.value === 401) {
          this.setState({ authorize: false });
        }
      });
  }

  render() {
    var info;
    if (this.state.authorize) {
      info = (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 align="center">User Profile</h4>
            </div>

            <div className="panel-body">
              <div className="box box-info">
                <div className="col-sm-6">
                  <span>
                    <h4>{this.state.nickname}</h4>
                  </span>
                </div>
                <div className="clearfix"></div>
                <hr></hr>
              </div>
              <div className="col-sm-5 col-xs-6 tital ">First Name:</div>
              <div className="col-sm-7 col-xs-6 ">{this.state.firstName}</div>
              <div className="clearfix"></div>
              <div className="bot-border"></div>
              <div className="col-sm-5 col-xs-6 tital ">Last Name:</div>
              <div className="col-sm-7"> {this.state.secondName}</div>
              <div className="clearfix"></div>
              <div className="bot-border"></div>
              <div className="col-sm-5 col-xs-6 tital ">Email:</div>
              <div className="col-sm-7">{this.state.email}</div>
              <div className="clearfix"></div>
              <div className="bot-border"></div>
            </div>
          </div>
        </div>
      );
    } else {
      info = (
        <div className="alert alert-danger" role="alert">
          <span>You are not authorized </span>
          <a href="login" className="alert-link">
            Login
          </a>
          <span> or </span>
          <a href="/register" className="alert-link">
            Register
          </a>
        </div>
      );
    }

    return <div>{info}</div>;
  }
}

export default User;
