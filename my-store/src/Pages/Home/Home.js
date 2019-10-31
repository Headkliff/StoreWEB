import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast } from "../../Components/Toasts/Toast";
import "./Home.css";
import API from "../../Components/Axios/API";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip:0,
      take:9,
      total: 0,
      isLoaded: false,
      items: []
    };
    this.getItems();
  }

  getItems = () => {
    const query = {
      name: "",
      selectedSort: "DateDesc",
      skip: this.state.skip,
      take: this.state.take,
      category: "",
      type: "",
      cost: 0
    };
    console.log(query)
    API.post("/item/items", query)
      .then(res => {
        const { items } = this.state;
        items.push(...res.data.items);
        this.setState({ items, total: res.data.count, isLoaded: items.length === res.data.count });
      })
      .catch(error => {
        errorToast("Something went wrong");
      });
  };

  seeMore() {
    this.setState(
      {
        skip: this.state.skip+this.state.take
      },
      () => this.getItems()
    );
  }

  showMore(id) {
    this.props.history.push("/item/" + id);
  }

  renderItems() {
    return this.state.items.map(item => {
      const { id, name, categoryName, typeName, cost } = item;
      return (
        <Col xl="4" key={id}>
          <div className="card border-dark mb-3">
            <div className="card-body">
              <img src="\Media\nonIMG.png" className="card-img-top" alt="..." />
              <h5 className="card-text item-name">{name}</h5>
              <p className="card-text">{categoryName}</p>
              <p className="card-text">{typeName}</p>
              <p className="card-text">{cost} $</p>
              <button
                className="btn btn-primary"
                onClick={() => this.showMore(id)}
              >
                Show More
              </button>
            </div>
          </div>
        </Col>
      );
    });
  }

  render() {
    return (
      <>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_LEFT}
        />
        <div className="jumbotron">
          <Container>
            <Row>
              <Col sm>
                <Row>{this.renderItems()}</Row>
              </Col>
            </Row>
            <Row>
              <Col sm align="center">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => this.seeMore()}
                  disabled={this.state.isLoaded}
                >
                  See More
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Home;
