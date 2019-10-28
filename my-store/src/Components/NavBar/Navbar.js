import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout } from "../../Actions/userActionCreaters";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { errorToast } from "../../Components/Toasts/Toast";

class Navibar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  handleLogOut = e => {
    e.preventDefault();
    this.props.userLogout();
    localStorage.clear();
  };

  handleChenge = e => {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  Search = () => {
    const query = {
      name: this.state.search,
      selectedSort: ""
    };
    axios
      .post("https://localhost:44326/api/item/items", query)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        errorToast("Something went wrong");
      });
  };

  navigation() {
    if (!this.props.isAuthorized) {
      return (
        <>
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_LEFT}
          />
          <nav className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
              My Store
            </Link>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                id = 'search'
                name="search"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.search}
                onChange={() => this.handleChenge}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
                onClick={() => this.Search()}
              >
                Search
              </button>
            </form>
            <div className="navbar" id="navbarSupportedContent">
              <ol className="nav justify-content-end mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registration">
                    Register
                  </Link>
                </li>
              </ol>
            </div>
          </nav>
        </>
      );
    }

    return (
      <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          My Store
        </Link>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            id='search'
            name="search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={this.state.search}
            onChange={() => this.handleChenge}
          />
          <button
            class="btn btn-outline-success my-2 my-sm-0"
            type="button"
            onClick={() => this.Search()}
          >
            Search
          </button>
        </form>
        <div className="navbar" id="navbarSupportedContent">
          <div className="btn-group dropleft">
            <button
              type="button"
              className="btn btn-danger dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.props.nickname}
            </button>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/user">
                Profile
              </Link>
              <Link className="dropdown-item" to="/user/edit">
                Edit
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={this.handleLogOut}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  render() {
    return <div>{this.navigation()}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  userLogout: () => {
    dispatch(logout());
  }
});

const mapStateToProps = state => ({
  nickname: state.user.nickname,
  isAuthorized: state.user.authorized,
  role: state.user.role
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navibar)
);
