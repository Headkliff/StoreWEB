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
              <Link to="/items">Item List</Link>
            </li>
            <li>
              <Link to="/items/create">Create Item</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Sidebar;
