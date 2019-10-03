import React from "react";
import {Link} from 'react-router-dom'

function NavItem (props){
    const pageURI = window.location.pathname + window.location.search;
    const liClassName =
      props.path === pageURI ? "nav-item active" : "nav-item";
    const aClassName = props.disabled ? "nav-link disabled" : "nav-link";
    return (
      <li className={liClassName}>
        <Link to={props.path} className={aClassName}>
          {props.name}
          {props.path === pageURI ? (
            <span className="sr-only">(current)</span>
          ) : (
            ""
          )}
        </Link>
      </li>
    );
};

export default NavItem