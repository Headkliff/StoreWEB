import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { compose } from "redux";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast } from "../../Components/Toasts/Toast";

class Item extends React.Component {
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

  edit() {
    this.props.history.push("/item/edit/" + this.state.id);
  }

  render() {
    return (
      <>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_LEFT}
        />
        <Jumbotron>
          <Container>
            <Row>
              <Col sm={4}>
                <img
                  src="\Media\nonIMG.png"
                  className="card-img-top"
                  alt="..."
                />
              </Col>
              <Col sm={7}>
                <h1 className="display-7">{this.state.name}</h1>
                <Row>
                  <dt className="col-sm-3">Category:</dt>
                  <dd className="col-sm-9">{this.state.category}</dd>
                  <dt className="col-sm-3">Type:</dt>
                  <dd className="col-sm-9">
                    <p>{this.state.type}</p>
                  </dd>
                  <dt className="col-sm-3">Cost:</dt>
                  <dd className="col-sm-9">
                    <p>{this.state.cost}$</p>
                  </dd>
                </Row>
              </Col>
              <Row>
                <Col sm={7}>
                  {this.props.role === "Admin" && (
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => this.edit()}
                    >
                      Edit
                    </button>
                  )}
                </Col>
              </Row>
            </Row>
          </Container>
        </Jumbotron>
      </>
    );
  }
}

const mapStateToProps = state => ({
  nickname: state.user.nickname,
  isAuthorized: state.user.authorized,
  role: state.user.role
});

export default compose(connect(mapStateToProps)(Item));