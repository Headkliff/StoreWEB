import React from "react";
import { Link } from "react-router-dom";
import NavItem from "../NavBar/NavItem";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout } from "../../Actions/userActionCreaters";
import { Dropdown } from "react-bootstrap";
class Navibar extends React.Component {
  handleLogOut = e => {
    e.preventDefault();
    this.props.userLogout();
    localStorage.clear()
    // this.props.history.push("/login");
  };

  navigation() {
    if (this.props.isAuthorized === false) {
      return (
        <nav className="navbanr navbar-expand-lg navbar-light bg-secondary bg-warning">
          <Link className="navbar-brand" to="/">
            Store
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ol className="navbar-nav mr-auto">
              <NavItem path="/" name="Home" />
            </ol>
            <ol className="nav justify-content-end">
              <NavItem path="/login" name="Login" />
              <NavItem path="/registration" name="Registration" />
            </ol>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbanr navbar-expand-lg navbar-light bg-secondary bg-warning">
          <Link className="navbar-brand" to="/">
            Store
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ol className="navbar-nav mr-auto">
              <NavItem path="/" name="Home" />
            </ol>
            <ol className="nav justify-content-end">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {this.props.nickname}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item to="/user">Profile</Dropdown.Item>
                  <Dropdown.Item to="/edit">Edit</Dropdown.Item>
                  <Dropdown.Item onClick={this.handleLogOut}
                      to="/login">Logout </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ol>
          </div>
        </nav>
      );
    }
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
