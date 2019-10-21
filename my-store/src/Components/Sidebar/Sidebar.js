import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

class Sidebar extends React.Component {
  render() {
    return (
      <div id="viewport">
        <div id="sidebar">
          <ul className="nav">
            <li>
              <Link to="/users">User List</Link>
            </li>
            <li>
              <Link to="/items">Product List</Link>
            </li>
            <li>
              <Link to="#">Something</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Sidebar;
