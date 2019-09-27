import React from "react";
import axios from "axios";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    console.log("test");
    this.getUserInfo();
    this.state = {
      nickname: "",
      email: "",
      firstName: "",
      secondName: "",
      newPassword: ""
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
      password: this.state.newPassword,
      firstName: this.state.firstName,
      secondName: this.state.secondName,
      email: this.state.email
    };
    console.log("The form was submitted with the following data:");
    console.log(this.state);

    axios.post("https://localhost:44326/api/user", user).then(res => {
      localStorage.setItem("token", res.data);
      this.props.history.push("/user");
    });
  };

  getUserInfo() {
    axios
      .get("https://localhost:44326/api/user", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res => {
        this.setState({
          nickname: res.data.nickname,
          email: res.data.email,
          firstName: res.data.firstName,
          secondName: res.data.secondName
        });
      })
      .catch(function() {
        this.props.history.push("/notfound");
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 align="center">User info editing</h4>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
                    Nickname:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail3"
                      placeholder={this.state.nickname}
                    />
                  </div>
                </div>
                
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
                    First Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail3"
                      placeholder={this.state.firstName}
                    />
                  </div>
                </div>
                
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
                    Second Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail3"
                      placeholder={this.state.secondName}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
                    Email:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail3"
                      placeholder={this.state.email}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
                    New Password:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      id="inputEmail3"
                      placeholder={this.state.newPassword}
                    />
                  </div>
                </div>

              </div>
              <div className="FormField">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUser;
