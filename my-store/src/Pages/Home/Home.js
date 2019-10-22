import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom"
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast } from "../../Components/Toasts/Toast";
import "./Home.css"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true
    };
    this.getItems();
  }

  getItems() {
    axios
      .get("https://localhost:44326/api/Item/items")
      .then(res => {
        this.setState({
          items: res.data,
          loading: false
        });
        
      })
      .catch(error => {
        errorToast("Something went wrong");
        this.setState({ loading: false });
      });
  }
  showMore(id) {
    this.props.history.push("/item/"+id);
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
          <h1 align="center">Welcome to My Store</h1>
          <Container>
            <Row>
              {/* <Col xs={1} md={2}>
              Menu
            </Col> */}
              <Col sm>
                <Row>{this.renderItems()}</Row>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <Link className="page-link" to="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </Container>
      </>
    );
  }
}

export default Home;
