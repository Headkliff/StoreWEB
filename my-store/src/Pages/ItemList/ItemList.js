import React from "react";
import { Redirect } from "react-router";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { connect } from "react-redux";
import UnAuthorize from "../../Components/UnAuthorize/UnAuthorize";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import API from "../../Components/Axios/API";
import "./ItemList.css";
import { errorToast } from "../../Components/Toasts/Toast";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { orderBy } from "@progress/kendo-data-query";
import '@progress/kendo-theme-default/dist/all.css';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      type: "",
      sortType: "",
      loading: true,
      page: 0,
      total: 0,
      items: [],
      caegories: [],
      types: [],
      sort: [{ field: "Name", dir: "asc" }],
      filter: undefined
    };
    this.getMoreItem();
    this.getCategories();
    this.getTypes();
  }

  showMore() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => this.getMoreItem()
    );
  }

  sortItems = () => {
    const sort = this.state.sort[0]
    let select = ""
    if (sort !== undefined) {
      select = sort.field + sort.dir
    } else { select = '' }
    console.log(select)
    API.post("/item/items", {
      name: this.state.name,
      selectedSort: select,
      pageNumber: this.state.page,
      category: this.state.category,
      type: this.state.type
    })
      .then(res => {
        this.setState({
          items: res.data.items,
          total: res.data.count
        });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  getMoreItem = () => {
    API.post("/item/items", {
      name: this.state.name,
      selectedSort: this.state.sortType,
      pageNumber: this.state.page,
      category: this.state.category,
      type: this.state.type
    })
      .then(res => {
        const { items } = this.state;
        items.push(...res.data.items);
        this.setState({ items, rowData: this.state.items });
      })
      .catch(error => {
        errorToast(error.data);
        this.setState({ loading: false });
      });
  };

  getCategories = () => {
    this.setState({ caegories: this.state.items.category })
  };

  getTypes = () => {
    this.setState({ types: this.state.items.type })
  };

  pageRender() {
    if (this.props.isAuthorized) {
      return (
        <>
          <h1 id="title" align="center">
            All Store Items
          </h1>
          <Grid
            style={{ height: "450px" }}
            data={orderBy(this.state.items, this.state.sort)}
            sortable
            sort={this.state.sort}
            filterable={true}
            filter={this.state.filter}
            pageable={true}
            onSortChange={e => {
              this.setState(
                {
                  sort: e.sort
                },
                () => this.sortItems()
              );
            }}
            onFilterChange={() => this.filterChange}
          >
            <Column field="id" />
            <Column field="name" />

            <Column field="categoryName" title="Category" />

            <Column field="typeName" title="Type" />

            <Column field="cost" />
          </Grid>
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
  role: state.user.role,
  page: state.count.count
});
export default connect(mapStateToProps)(ItemList);
