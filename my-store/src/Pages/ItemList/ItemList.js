import React from "react";
import { Redirect } from "react-router";
import {
  Button,
  Col,
  Row,
  InputGroup,
  FormControl,
  Dropdown,
  Form
} from "react-bootstrap";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { connect } from "react-redux";
import UnAuthorize from "../../Components/UnAuthorize/UnAuthorize";
import Sidebar from "../../Components/Sidebar/Sidebar";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import API from "../../Components/Axios/API";
import "./ItemList.css";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      categoty: "",
      sortType: "",
      loading: true,
      isNameAsc: true,
      page: 0,
      items: [],
      categories: [],
      types:[]
    };
    this.getMoreItem();
    this.getCategories();
  }

  showMore() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => this.getMoreItem()
    );
  }

  NameSort = () => {
    if (!this.state.isNameAsc) {
      this.setState(
        {
          sortType: "NameAsc",
          page: 0,
          isNameAsc: !this.state.isNameAsc
        },
        () => this.sortItems()
      );
    } else {
      this.setState(
        {
          sortType: "NameDesc",
          page: 0,
          isNameAsc: !this.state.isNameAsc
        },
        () => this.sortItems()
      );
    }
  };

  categorySort = (name) => {
    this.setState({
      category: name
    }, this.sortItems())
  };

  sortItems = () => {
    API.post("/item/items", {
      name: this.state.name,
      selectedSort: this.state.sortType,
      pageNumber: this.state.page,
      category:this.state.categoty
    })
      .then(res => {
        this.setState({
          items: res.data
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
      category:this.state.categoty
    })
      .then(res => {
        const { items } = this.state;
        items.push(...res.data);
        this.setState({ items });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  getCategories = () => {
    API.get("/item/categories")
      .then(res => {
        this.setState({
          categories: res.data
        });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  handleChange = e => {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.sortItems();
  };

  renderCategory = () => {
    return this.state.categories.map(category => {
      const { id, name } = category;
      return <Dropdown.Item key={id}><Button variant="text" onClick={()=>this.categorySort(name)}>{name}</Button></Dropdown.Item>;
    });
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
            <EditButton id={id} />
          </td>
          <td>
            <DeleteButton id={id} />
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
                <th scope="col">
                  <Row>
                    <Col>
                      <Form onSubmit={this.handleSubmit}>
                        <InputGroup size="sm" className="mb-1">
                          <InputGroup.Prepend></InputGroup.Prepend>
                          <FormControl
                            placeholder="Name Search"
                            aria-label="Small"
                            name="name"
                            id="name"
                            aria-describedby="inputGroup-sizing-sm"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                      </Form>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => this.NameSort()}
                        disabled={this.state.isNameAsc}
                      >
                        <img src="\Media\up-arrow.png" alt="..." />
                      </Button>

                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => this.NameSort()}
                        disabled={!this.state.isNameAsc}
                      >
                        <img src="\Media\down-arrow.png" alt="..." />
                      </Button>
                    </Col>
                  </Row>
                </th>
                <th scope="col">
                  <Dropdown>
                    <Dropdown.Toggle
                      split
                      variant="secondary"
                      id="dropdown-basic"
                    >
                      Category
                    </Dropdown.Toggle>
                    <Dropdown.Menu>{this.renderCategory()}</Dropdown.Menu>
                  </Dropdown>
                </th>
                <th scope="col">Type</th>
                <th scope="col">Cost</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
          <Row>
            <Col sm align="center">
              <Button variant="secondary" onClick={() => this.showMore()}>
                Show More
              </Button>
            </Col>
          </Row>
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
  role: state.user.role,
  page: state.count.count
});
export default connect(mapStateToProps)(ItemList);
