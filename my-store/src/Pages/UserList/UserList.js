import React from "react";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast, successToast } from "../../Components/Toasts/Toast";

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
        data: user.id
      })
      .then(res => {
        successToast("User delete!");
      })
      .catch(error => {
        errorToast("Somethin went wrong!");
      });
  };

  renderTableData() {
    return this.state.users.map(user => {
      const { id, nickname, email, firstName, secondName } = user;
      return (
        <tr key={nickname}>
          <td>{nickname}</td>
          <td>{email}</td>
          <td>{firstName}</td>
          <td>{secondName}</td>
          <td>
            <button type="button" className="btn btn-warning btn-sm">
              Soft Delete
            </button>
          </td>
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

  render() {
    return (
      <>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <div className="container">
          <h1 id="title" align="center">
            React Dynamic Table
          </h1>
          <table id="users" className="table table-dark">
            <thead>
              <tr>
                <th scope="col">Nickname</th>
                <th scope="col">Email</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>
      </>
    );
  }
}
export default UserList;
