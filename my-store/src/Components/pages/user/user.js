import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.getUserInfo();
    this.state = {
      nickname: "",
      email: "",
      firstName: "",
      secondName: "",
      authorized: false,
      loading: true
    };
  }
  
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
          secondName: res.data.secondName,
          loading: false
        });
      })
      .catch(error=> {
          this.setState({ authorize: false, loading: false });
      });
  }

  render() {
    var info;
    if (this.state.loading)
      return (
        <div className="center">
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="loaded">User Details</div>
              </div>
            </div>
            <div className="panel-body">
              <div className="box box-info">
                <div className="d-flex align-items-center">
                  <strong>Loading...</strong>
                  <div
                    className="spinner-border ml-auto"
                    role="status"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    else {
      if (this.state.authorize) {
        info = (
          <div className="center">
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="loaded">User Details</div>
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
                  <div className="col-sm-7 col-xs-6 ">
                    {this.state.firstName}
                  </div>
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
                <hr></hr>
                <div className="clearfix"></div>
                <button type="button" className="btn btn-link">
                  <Link to="/edituser">Edit</Link>
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        info = (
          <div className="jumbotron jumbotron">
            <div className="container">
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
            </div>
          </div>
        );
      }
      return <div>{info}</div>;
    }
  }
}

export default User;
