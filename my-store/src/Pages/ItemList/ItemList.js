import React from "react";
import axios from "axios";
import {Redirect} from "react-router"
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast, successToast } from "../../Components/Toasts/Toast";
import { connect } from "react-redux";
import { compose } from "redux";
import UnAuthorize from "../../Components/UnAuthorize/UnAuthorize";
import Sidebar from "../../Components/Sidebar/Sidebar";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      items: []
    };
    this.getUsers();
  }
  getUsers = () => {
    axios
      .get("https://localhost:44326/api/item/items")
      .then(res => {
        this.setState({
          items: res.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  deleteUser = item => {
    axios
      .delete("https://localhost:44326/api/item/delete", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: item
      })
      .then(res => {
        successToast("User delete!");
        this.getUsers();
      })
      .catch(error => {
        errorToast(error.response.data.message);
      });
  };

  editUser = id=>{
      this.props.history.push("/item/edit/"+id)
  }

  renderTableData() {
    return this.state.items.map(item => {
      const { id, name, categoryName, typeName,  cost } = item;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{categoryName}</td>
          <td>{typeName}</td>
          <td>{cost}</td>
          <td>
          <button
              type="button"
              className="btn btn-info btn-sm"
              onClick={() => this.editUser(id)}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => this.deleteUser(item)}
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
            All Store Items
          </h1>
          <table id="users" className="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Type</th>
                <th scope="col">Cost</th>
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
    return (
      (this.props.role === "Admin"?(<>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_LEFT}
        />
        <Sidebar/>

        <div className="jumbotron jumbotron">
          <div className="container">{this.pageRender()}</div>
        </div>
      </>
    ): <Redirect to='/'/> ));
  }
}
const mapStateToProps = state => ({
  nickname: state.user.nickname,
  isAuthorized: state.user.authorized, 
  role : state.user.role
});
export default compose(connect(mapStateToProps)(ItemList));
