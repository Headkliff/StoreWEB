import React from "react";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast,successToast } from "../../Components/Toasts/Toast";
import { Jumbotron, Container } from "react-bootstrap";

class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      category: "",
      type: "",
      cost: 0,
      loading: true
    };
    this.getItem(props);
  }

  getItem() {
    axios
      .get("https://localhost:44326/api/Item/" + this.state.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          type: res.data.type,
          category: res.data.category,
          cost: res.data.cost
        });
      })
      .catch(error => {
        errorToast(error.response.data.message);
        this.setState({ loading: false });
      });
  }
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
    e.preventDefauld();
    const newItemData = {
      name: this.state.name,
      category: this.state.category,
      type: this.state.type,
      cost: this.state.cost
    };
    axios
        .post("https://localhost:44326/api/item/editItem", newItemData, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
        .then(res => {
          successToast("New data set");
        })
        .catch(error => {
          errorToast(error.response.data.message);
        });

  };

  render() {
    return (
      <>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_LEFT}
        />
        <Jumbotron>
          <Container>
            <form onSubmit={this.handleSubmit}>
              <div>
                <div className="form-group row">
                  <label
                    htmlFor="firstName"
                    className="col-sm-2 col-form-label"
                  >
                    Item Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={"form-control "}
                      id="itemName"
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
                    htmlFor="secondName"
                    className="col-sm-2 col-form-label"
                  >
                    Category:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={"form-control "}
                      id="category"
                      required
                      name="category"
                      formNoValidate
                      minLength="5"
                      placeholder={this.state.category}
                      value={this.state.category}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="Email" className="col-sm-2 col-form-label">
                    Type:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className={"form-control "}
                      id="type"
                      name="type"
                      formNoValidate
                      required
                      minLength="5"
                      placeholder={this.state.type}
                      value={this.state.type}
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
    );
  }
}

export default EditItem;
