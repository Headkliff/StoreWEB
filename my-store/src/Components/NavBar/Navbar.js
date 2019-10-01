import React from "react";
import NavItem from "../NavBar/NavItem";

class Navibar extends React.Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("token");
    this.nickname = this.props.nickname
  }

  handleLogOut =e=> {
    e.preventDefault();
    localStorage.clear();  
  };

  navigation() {
    if (this.token === null) {
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
            <NavItem path="/login" name="Log In" disabled="true" />
            <NavItem path="/registration" name="Registration" disabled="true" />
          </ol>
        </div>
      </nav>
      )
    } else {
      return(
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
            <NavItem path="/user" name="User Page" disabled="true" />
            <button type="button" className='btn btn-link' onClick={this.handleLogOut}>Log Out</button>
          </ol>
        </div>
      </nav>
      )  
    }
  }
  render() {
    return <div>
      {this.navigation()}
    </div>
  }
}

export default Navibar;
