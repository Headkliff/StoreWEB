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
import Sidebar from "../../Components/Sidebar/Sidebar";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class EditButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        className="btn btn-warning btn-sm"
        onClick={() => this.editItem(this.props.id)}
      >
        Edit
      </button>
    );
  }
}

function editButton(cell, row,enumObject,index) {
  return <EditButton id={index} />;
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      items: []
    };
    this.getItem();
    this.getTypes();
  }
  getItem = () => {
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

  getTypes() {
    axios
      .get("https://localhost:44326/api/item/types")
      .then(res => {
        this.setState({
          types: res.data
        });
      })
      .catch(error => {
        errorToast(error.response.data.message);
        this.setState({ loading: false });
      });
  }

  deleteItem = item => {
    axios
      .delete("https://localhost:44326/api/item/delete", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: item
      })
      .then(res => {
        successToast("User delete!");
        this.getItem();
      })
      .catch(error => {
        errorToast(error.response.data.message);
      });
  };

  editItem = id => {
    this.props.history.push("/item/edit/" + id);
  };

  renderTableData() {
    return this.state.items.map(item => {
      const { id, name, categoryName, typeName, cost } = item;
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
              onClick={() => this.editItem()}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => this.deleteItem()}
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
          <BootstrapTable
            data={this.state.items}
            version="4"
            multiColumnSort={2}
            
          >
            <TableHeaderColumn isKey dataField="id" width="100">
              Item ID
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="name"
              filter={{ type: "TextFilter", delay: 1000 }}
            >
              Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="categoryName" dataSort={true}>
              Category
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="typeName"
              fdataField="categoryName"
              dataSort={true}
            >
              Type
            </TableHeaderColumn>
            <TableHeaderColumn dataField="cost" dataSort={true} width="125">
              Cost
            </TableHeaderColumn>
            <TableHeaderColumn  dataFormat={editButton}>
              Edit
            </TableHeaderColumn>
          </BootstrapTable>
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
        <Sidebar />

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
export default compose(connect(mapStateToProps)(ItemList));
