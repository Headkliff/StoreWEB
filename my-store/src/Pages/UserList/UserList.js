import React from "react";
import {Form, FormControl, InputGroup,Row, Col, Button} from 'react-bootstrap'
import { Redirect } from "react-router";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast, successToast } from "../../Components/Toasts/Toast";
import { connect } from "react-redux";
import { compose } from "redux";
import UnAuthorize from "../../Components/UnAuthorize/UnAuthorize";
import API from "../../Components/Axios/API";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      nickname: "",
      email:'',
      page:0,
      users: [],
      end: false
    };
    this.getMoreUsers();
  }

  showMore=()=>{
    this.setState(
      {
        page: this.state.page + 1
      },
      () => this.getMoreUsers()
    );
  }
  getMoreUsers = () => {
    API.post("/user/userList", { nickname: this.state.nickname, email: this.state.email, pageNumber: this.state.page, })
      .then(res => {
        const { users } = this.state;
        users.push(...res.data);
        this.setState({ users });
      })
      .catch(error => {
        this.setState({ loading: false });
        errorToast(error.response.data.message)
      });
  };

  deleteUser = user => {
    API.delete("/User/delete", user)
      .then(res => {
        successToast("User delete!");
        this.getMoreUsers();
      })
      .catch(error => {
        errorToast(error.response.data.message);
      });
  };

  blockUser = user => {
    API.delete("/User/softDelete", user)
      .then(res => {
        successToast("User sucssesfuly blocked!");
        this.getMoreUsers();
      })
      .catch(error => {
        errorToast(error.response.data.message);
      });
  };
  unlockUser = user => {
    API.delete("/User/unlock", user)
      .then(res => {
        successToast("User sucssesfuly unlocked!");
        this.getMoreUsers();
      })
      .catch(error => {
        errorToast(error.response.data.message);
      });
  };

  blockButton=(user)=> {
    if (user.isDeleted) {
      return (
        <button
          type="button"
          className="btn btn-warning btn-sm"
          onClick={() => this.unlockUser(user)}
        >
          Unlock
        </button>
      );
    }
    return (
      <button
        type="button"
        className="btn btn-warning btn-sm"
        onClick={() => this.blockUser(user)}
      >
        Block
      </button>
    );
  }

  handleChange=e=>{
    e.preventDefault()
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value
      },
      () => this.sortUsers()
    );
  }

  sortUsers =() => {
    API.post("/user/userList", { nickname: this.state.nickname, email: this.state.email, pageNumber:0 })
      .then(res => {
        this.setState({
          users: res.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  renderTableData() {
    return this.state.users.map(user => {
      const { id, nickname, email, firstName, secondName, isDeleted } = user;
      return (
        <tr key={id}>
          <td>{nickname}</td>
          <td>{email}</td>
          <td>{firstName}</td>
          <td>{secondName}</td>
          <td>{isDeleted && "Blocked"}</td>
          <td>{this.blockButton(user)}</td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => this.deleteUser(user)}
            >
              Delete
            </button>
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
            All Store Accounts
          </h1>
          <table id="users" className="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">
                  <Form>
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend></InputGroup.Prepend>
                      <FormControl
                        placeholder="Nickname Search"
                        aria-label="Small"
                        name="nickname"
                        id="nickname"
                        aria-describedby="inputGroup-sizing-sm"
                        value={this.state.nickname}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                  </Form>
                </th>
                <th scope="col"><Form>
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend></InputGroup.Prepend>
                      <FormControl
                        placeholder="Email Search"
                        aria-label="Small"
                        name="email"
                        id="email"
                        aria-describedby="inputGroup-sizing-sm"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                  </Form></th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Block</th>
                <th scope="col"></th>
                <th scope="col"></th>
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
  role: state.user.role
});
export default compose(connect(mapStateToProps)(UserList));
