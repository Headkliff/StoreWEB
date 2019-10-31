import React from "react";
import { Redirect } from "react-router";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { connect } from "react-redux";
import UnAuthorize from "../../Components/UnAuthorize/UnAuthorize";
import API from "../../Components/Axios/API";
import "./ItemList.css";
import { errorToast } from "../../Components/Toasts/Toast";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { orderBy } from "@progress/kendo-data-query";
import "@progress/kendo-theme-default/dist/all.css";
import dropdownFilterCell from "../ItemList/dropdpwnFilterCell";

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
      skip: 0,
      take: 9,
      total: 0,
      items: [],
      types: [],
      categories: [],
      sort: [{ field: "Name", dir: "asc" }],
      filter: undefined
    };
  }
  componentDidMount() {
    this.getMoreItem();
    this.getCategories();
    this.getTypes();
  }

  pageChange = (event) => {
    console.log(event.page)
    this.setState({
        skip: event.page.skip,
        take: event.page.take
    },()=>this.getMoreItem());
}

  sortItems = () => {
    const sort = this.state.sort[0];
    let select = "";
    if (sort !== undefined) {
      select = sort.field + sort.dir;
    } else {
      select = "";
    }
    console.log(select);
    API.post("/item/items", {
      name: this.state.name,
      selectedSort: select,
      pageNumber: this.state.page,
      skip: 0,
      take: this.state.take,
      category: this.state.category,
      type: this.state.type,
      cost: this.state.cost
    })
      .then(res => {
        console.log(this.state);
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
      skip: this.state.skip,
      take: this.state.take,
      category: this.state.category,
      type: this.state.type
    })
      .then(res => {
        this.setState({ items: res.data.items, rowData: this.state.items, total: res.data.count });
      })
      .catch(error => {
        errorToast(error.data);
        this.setState({ loading: false });
      });
  };

  getCategories = () => {
    API.get("/item/categories").then(res => {
      this.setState({
        categories: res.data.map(item => item.name)
      });
    });
  };

  getTypes = () => {
    API.get("/item/types").then(res => {
      this.setState({
        types: res.data.map(item => item.name)
      });
    });
  };

  filterChange = event => {
    let categoryfilter = "";
    let typeFilter = "";
    let name = "";
    let cost = 0;
    if (event.filter !== null) {
      if (
        event.filter.filters.find(f => f.field === "categoryName") !== undefined
      ) {
        categoryfilter = event.filter.filters.find(
          f => f.field === "categoryName"
        ).value;
      }
      if (
        event.filter.filters.find(f => f.field === "typeName") !== undefined
      ) {
        typeFilter = event.filter.filters.find(f => f.field === "typeName")
          .value;
      }
      if (event.filter.filters.find(f => f.field === "name") !== undefined) {
        name = event.filter.filters.find(f => f.field === "name").value;
      }
      if (event.filter.filters.find(f => f.field === "cost") !== undefined) {
        cost = event.filter.filters.find(f => f.field === "cost").value;
      }
    }
    this.setState(
      {
        filter: event.filter,
        name: name,
        cost: cost,
        category: categoryfilter,
        type: typeFilter
      },
      () => this.sortItems()
    );
  };

  pageRender() {
    const CategoryFilter = dropdownFilterCell(
      this.state.categories,
      "Select category"
    );
    const TypeFilter = dropdownFilterCell(this.state.types, "Select type");
    if (this.props.isAuthorized) {
      return (
        <>
          <h1 id="title" align="center">
            All Store Items
          </h1>
          <Grid
            style={{ height: "480px" }}
            data={orderBy(this.state.items, this.state.sort)}
            sortable
            sort={this.state.sort}
            filterable={true}
            filter={this.state.filter}
            skip={this.state.skip}
            take={this.state.take}
            total={this.state.total}
            pageable={true}
            onSortChange={e => {
              this.setState(
                {
                  sort: e.sort
                },
                () => this.sortItems()
              );
            }}
            filterOperators={{
              text: [
                { text: "grid.filterContainsOperator", operator: "contains" }
              ],
              numeric: [{ text: "grid.filterEqOperator", operator: "eq" }]
            }}
            onFilterChange={this.filterChange}
            onPageChange={this.pageChange}
          >
            <Column
              field="id"
              filterable={false}
              sortable={false}
              width="80px"
            />
            <Column field="name" title="Name" />

            <Column
              field="categoryName"
              title="Category"
              filterCell={CategoryFilter}
            />

            <Column field="typeName" title="Type" filterCell={TypeFilter} />

            <Column field="cost" title="Cost" />
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
