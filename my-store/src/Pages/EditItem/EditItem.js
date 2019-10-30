import React from "react";
import { Redirect } from "react-router";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast, successToast } from "../../Components/Toasts/Toast";
import { Jumbotron, Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import API from "../../Components/Axios/API";

class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      categoryName: "",
      typeName: "",
      cost: 0,
      loading: true,
      types: [],
      categoryes: []
    };
    this.getItem();
    this.getTypes();
    this.getCategories();
  }

  getItem() {
    API
      .get("item/" + this.state.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          typeName: res.data.typeName,
          categoryName: res.data.categoryName,
          cost: res.data.cost
        });
      })
      .catch(error => {
        errorToast(error.response.data.message);
        this.setState({ loading: false });
      });
  }

  getTypes() {
    API
      .get("item/types")
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

  getCategories() {
    API
      .get("item/categories")
      .then(res => {
        this.setState({
          categoryes: res.data
        });
      })
      .catch(error => {
        errorToast(error.response.data.message);
        this.setState({ loading: false });
      });
  }

  renderTypes() {
    return this.state.types.map(type => {
      const { id, name } = type;
      return <option key={id}>{name}</option>;
    });
  }

  renderCatigories() {
    return this.state.categoryes.map(category => {
      const { id, name } = category;
      return <option key={id}>{name}</option>;
    });
  }

  handleChange = e=> {
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
    const newItemData = {
      id: this.state.id,
      name: this.state.name,
      categoryName: this.state.categoryName,
      typeName: this.state.typeName,
      cost: this.state.cost
    };
    API
      .post("item/edit", newItemData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res => {
        successToast("New data set");
      })
      .catch(error => {
        errorToast("Error "+ error.response.status + ":" +error.response.data.message);
      });
  };

  render() {
    return this.props.role === "Admin" ? (
      <>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_LEFT}
        />
        <Jumbotron>
          <Container>
            <form
              className="needs-validation"
              onSubmit={this.handleSubmit}
            >
              <div>
                <div className="form-group row">
                  <label
                    htmlFor="itemName"
                    className="col-sm-2 col-form-label"
                  >
                    Item Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={"form-control "}
                      id="name"
                      name="name"
                      formNoValidate
                      required
                      minLength="4"
                      placeholder={this.state.name}
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="category"
                    className="col-sm-2 col-form-label"
                  >
                    Category:
                  </label>
                  <div className="col-sm-10">
                    <Form.Control
                      as="select"
                      name="categoryName"
                      formNoValidate
                      value={this.state.categoryName}
                      onChange={this.handleChange}
                    >
                      {this.renderCatigories()}
                    </Form.Control>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="type" className="col-sm-2 col-form-label">
                    Type:
                  </label>
                  <div className="col-sm-10">
                    <Form.Control
                      as="select"
                      name="typeName"
                      formNoValidate
                      value={this.state.typeName}
                      onChange={this.handleChange}
                    >
                      {this.renderTypes()}
                    </Form.Control>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="cost"
                    className="col-sm-2 col-form-label"
                  >
                    Cost:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={"form-control "}
                      id="cost"
                      required
                      name="cost"
                      formNoValidate
                      placeholder={this.state.cost}
                      value={this.state.cost}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="FormField">
                <button type="submit" className="btn btn-primary">
                  Submit Edits
                </button>
              </div>
            </form>
          </Container>
        </Jumbotron>
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
export default compose(connect(mapStateToProps)(EditItem));
