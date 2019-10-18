import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast, successToast } from "../../Components/Toasts/Toast";
import { connect } from "react-redux";
import { compose } from "redux";
import UnAuthorize from "../../Components/UnAuthorize/UnAuthorize";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: []
    };
    this.getUsers();
  }
  getUsers = () => {
    axios
      .get("https://localhost:44326/api/user/userList", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res => {
        this.setState({
          users: res.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  deleteUser = user => {
    axios
      .delete("https://localhost:44326/api/User/delete", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: user
      })
      .then(res => {
        successToast("User delete!");
        this.getUsers();
      })
      .catch(error => {
        errorToast(error.response.data.message);
      });
  };
  blockUser = user => {
    axios
      .delete("https://localhost:44326/api/User/softDelete", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: user
      })
      .then(res => {
        successToast("User sucssesfuly blocked!");
        this.getUsers();
      })
      .catch(error => {
        errorToast(error.response.data.message);
      });
  };
  unlockUser = user => {
    axios
      .delete("https://localhost:44326/api/User/unlock", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: user
      })
      .then(res => {
        successToast("User sucssesfuly unlocked!");
        this.getUsers();
      })
      .catch(error => {
        errorToast(error.response.data.message);
      });
  };
  blockButton(user) {
    if (user.isDeleted) {
      return (
        <button
          type="button"
          className="btn btn-warning btn-sm"
          onClick={() => this.unlockUser(user)}
        >
          Unlock
        </button>
      );
    }
    return (
      <button
        type="button"
        className="btn btn-warning btn-sm"
        onClick={() => this.blockUser(user)}
      >
        Block
      </button>
    );
  }
  renderTableData() {
    return this.state.users.map(user => {
      const { id, nickname, email, firstName, secondName, isDeleted } = user;
      return (
        <tr key={id}>
          <td>{nickname}</td>
          <td>{email}</td>
          <td>{firstName}</td>
          <td>{secondName}</td>
          <td>{isDeleted && "Blocked"}</td>
          <td>{this.blockButton(user)}</td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => this.deleteUser(user)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  pageRender() {
    if (this.props.isAuthorized) {
      return (
        <>
          <h1 id="title" align="center">
            All Store Accounts
          </h1>
          <table id="users" className="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">Nickname</th>
                <th scope="col">Email</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Block</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </>
      );
    } else {
      return <UnAuthorize />;
    }
  }
  render() {
    return this.props.role === "Admin" ? (
      <>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_LEFT}
        />

        <div className="jumbotron jumbotron">
          <div className="container">{this.pageRender()}</div>
        </div>
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = state => ({
  nickname: state.user.nickname,
  isAuthorized: state.user.authorized,
  role: state.user.role
});
export default compose(connect(mapStateToProps)(UserList));
