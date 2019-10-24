import React from "react";

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      categoryName: "",
      typeName: "",
      cost: 0,
      loading: true,
      types: [],
      categoryes: []
    };

    this.getTypes();
    this.getCategories();
  }

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

  getCategories() {
    axios
      .get("https://localhost:44326/api/item/categories")
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

  handleChange = (e, data) => {
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
      name: this.state.name,
      categoryName: this.state.categoryName,
      typeName: this.state.type,
      cost: this.state.cost
    };
    axios
      .post("https://localhost:44326/api/Item/create", newItemData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res => {
        successToast("New item created");
      })
      .catch(error => {
        errorToast(
          "Error " + error.response.status + ":" + error.response.data.message
        );
      });
  };

  render() {
    return this.props.role === "Admin" ? (
      <>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_LEFT}
        />
        <Sidebar />
        <Jumbotron>
          <Container>
            <form
              className="needs-validation"
              noValidate
              onSubmit={this.handleSubmit}
            >
              <div>
                <div className="form-group row">
                  <label htmlFor="itemName" className="col-sm-2 col-form-label">
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
                  <label htmlFor="category" className="col-sm-2 col-form-label">
                    Category:
                  </label>
                  <div className="col-sm-10">
                    <Form.Control
                      as="select"
                      name="category"
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
                      name="type"
                      value={this.state.typeName}
                      onChange={this.handleChange}
                    >
                      {this.renderTypes()}
                    </Form.Control>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="cost" className="col-sm-2 col-form-label">
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
