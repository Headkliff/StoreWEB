import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Sidebar.css";

class Sidebar extends React.Component {
  adminNav() {
    return (
      <>
        <li>
          <Link to="/users">User List</Link>
        </li>
        <li>
          <Link to="/items">Item List</Link>
        </li>
        <li>
          <Link to="/items/create">Create Item</Link>
        </li>
      </>
    );
  }

  render() {
    return (
      <div id="viewport">
        <div id="sidebar">
          <ul className="nav">
            {this.props.role ==="Admin" && this.adminNav()}
            <li>
              <Link to ="#">Ordedrs</Link>
            </li>
            <li>
              <Link to="#">Wishes</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nickname: state.user.nickname,
  isAuthorized: state.user.authorized,
  role: state.user.role
});

export default (connect(mapStateToProps)(Sidebar));
