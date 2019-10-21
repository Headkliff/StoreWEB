import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout } from "../Actions/userActionCreaters";

class Navibar extends React.Component {
  handleLogOut = e => {
    e.preventDefault();
    this.props.userLogout();
    localStorage.clear();
  };

  navigation() {
    if (!this.props.isAuthorized) {
      return (
        <nav className="navbar navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            My Store
          </Link>
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
      );
    }
      return (
        <nav className="navbar navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            My Store
          </Link>
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
                <Link className="dropdown-item" to="/user/users">
                  Users List
                </Link>
                <Link className="dropdown-item" to="/items">
                  Items List
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={this.handleLogOut}>
                  logout
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
  isAuthorized: state.user.authorized
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navibar)
);
