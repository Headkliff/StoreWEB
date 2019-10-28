import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast } from "../../Components/Toasts/Toast";
import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      page: 0
    };
    this.getItems();
  }

  getItems = () => {
    const query = {
      name: "",
      selectedSort: "DateDesc",
      pageNumber: this.state.page
    };
    axios
      .post("https://localhost:44326/api/item/items", query)
      .then(res => {
        this.setState({
          items: res.data,
        });
      })
      .catch(error => {
        errorToast("Something went wrong");
      });
  };

  PageCount = i => {
    return (
      <li className="page-item">
        <h2 className="btn btn-link page-link">{this.state.page+1}</h2>
      </li>
    );
  };

  Previous = () => {
    if (this.state.page>0 ) {
      this.setState ( {
        page: this.state.page --
      });
    }
    this.getItems();
  };

  Next = () => {
    if (this.state.items.length<9) {
      this.setState ({
        page: (this.state.page ++)
      });
    }
    console.log(this.state.page)
    this.getItems();
  };

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
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <button
                    type="button"
                    className="btn btn-link page-link"
                    aria-label="Previous"
                    onClick={() => this.Previous()}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {this.PageCount()}
                <li className="page-item">
                  <button
                    className="btn btn-link page-link"
                    aria-label="Next"
                    onClick={() => this.Next()}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </Container>
        </div>
      </>
    );
  }
}

export default Home;
