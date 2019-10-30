import React from "react";

import { connect } from "react-redux";
import { compose } from "redux";
import UnAuthorize from "../../Components/UnAuthorize/UnAuthorize";
import { errorToast } from "../../Components/Toasts/Toast";
import API from "../../Components/Axios/API";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      email: "",
      firstName: "",
      secondName: "",
      loading: true
    };
    this.getUserInfo();
  }

  getUserInfo() {
    API.get("/user")
      .then(res => {
        this.setState({
          nickname: res.data.nickname,
          email: res.data.email,
          firstName: res.data.firstName,
          secondName: res.data.secondName,
          loading: false
        });
      })
      .catch(error => {
        this.setState(
          { loading: false },
          errorToast("Error: " + error.response.data.message)
        );
      });
  }

  userInfo() {
    return (
      <div className="cart">
        <div className="cart-body">
          <div className="box box-info">
            <div className="col-sm-6">
              <span>
                <h4>{this.state.nickname}</h4>
              </span>
            </div>
            <div className="clearfix"></div>
            <hr></hr>
          </div>
          <div className="col-sm-5 col-xs-6 tital ">
            <strong>First Name:</strong>
            {this.state.firstName}
          </div>
          <div className="clearfix"></div>
          <div className="bot-border"></div>
          <div className="col-sm-5 col-xs-6 tital ">
            <strong>Last Name:</strong>
            {this.state.secondName}
          </div>
          <div className="clearfix"></div>
          <div className="bot-border"></div>
          <div className="col-sm-5 col-xs-6 tital ">
            <strong>Email:</strong>
            {this.state.email}
          </div>
          <div className="clearfix"></div>
          <div className="bot-border"></div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.loading)
      return (
        <div className="center">
          <div className="container">
            <div className="cart"></div>
            <div className="cart-body">
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
    if (this.props.isAuthorized) {
      return (
        <>
          <div className="center">
            <div className="container">{this.userInfo()}</div>
          </div>
        </>
      );
    } else {
      return <UnAuthorize />;
    }
  }
}

const mapStateToProps = state => ({
  nickname: state.user.nickname,
  isAuthorized: state.user.authorized,
  role: state.user.role
});

export default compose(connect(mapStateToProps)(User));
