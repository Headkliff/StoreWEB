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
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

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
      items: [],
      page:1,
      columnDefs: [
        {
          headerName: "Id",
          field: "id"
        },
        {
          headerName: "Name",
          field: "name",
          sortable: true,
          filter: true
        },
        {
          headerName: "Category",
          field: "categoryName",
          sortable: true,
          filter: true
        },
        {
          headerName: "Type",
          field: "typeName",
          sortable: true,
          filter: true
        },
        {
          headerName: "Cost",
          field: "cost",
          sortable: true
        }
      ]
    };
    this.getItem();
  }

  getItem = () => {
    const query = {
      name: "",
      selectedSort: ""
    };
    axios
      .post("https://localhost:44326/api/item/items", query)
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

  getRows=()=>{

  }

  pageRender() {
    if (this.props.isAuthorized) {
      return (
        <>
          <h1 id="title" align="center">
            All Store Items
          </h1>
          <div
            className="ag-theme-balham"
            style={{
              height: "500px",
              width: "1200px"
            }}
          >
            <AgGridReact              
              columnDefs={this.state.columnDefs}
              rowData={this.state.items}
            ></AgGridReact>
          </div>
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
