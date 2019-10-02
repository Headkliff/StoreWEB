import React from "react";
import NavItem from "../NavBar/NavItem";
import { connect } from 'react-redux'
import {compose} from 'redux';

class Navibar extends React.Component {

  handleLogOut = e => {
    e.preventDefault();
  };

  navigation() {
    if (this.props.authorized === null) {
      return (
        <nav className="navbanr navbar-expand-lg navbar-light bg-secondary bg-warning">
          <a className="navbar-brand" href="/">
            Store
          </a>
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
              <NavItem path="/login" name="Log In" />
              <NavItem path="/registration" name="Registration" />
            </ol>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbanr navbar-expand-lg navbar-light bg-secondary bg-warning">
          <a className="navbar-brand" href="/">
            Store
          </a>
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
              <button type="button" className="btn btn-link">
                <NavItem path="/user" name={this.props.nickname} />
              </button>

              <button
                type="button"
                className="btn btn-link"
                onClick={this.handleLogOut}
              >
                Log Out
              </button>
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

// const mapDispatchToProps = dispatch => ({
//   onClick: ()=>  {
//     dispatch(logout())
//   }
// })

const mapStateToProps = state => ({

  nickname : state.user.nickname,
  isAuthorized: state.user.authorized
  }
);

export default compose(connect(
  // mapDispatchToProps, 
  mapStateToProps)(Navibar));
