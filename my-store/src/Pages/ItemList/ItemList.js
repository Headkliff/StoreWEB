import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast } from "../../Components/Toasts/Toast";
import { connect } from "react-redux";
import UnAuthorize from "../../Components/UnAuthorize/UnAuthorize";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

function editButton(cell, row) {
  return <EditButton id={row.id} />;
}

function deleteButton(cell, row) {
  return <DeleteButton item={row} />;
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
        errorToast(error.response);
        this.setState({ loading: false });
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
            ref="tabel"
            data={this.state.items}
            version="4"
            pagination
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
            <TableHeaderColumn dataFormat={editButton} width="75">
              Edit
            </TableHeaderColumn>
            <TableHeaderColumn dataFormat={deleteButton} width="75">
              Delete
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
export default connect(mapStateToProps)(ItemList);
