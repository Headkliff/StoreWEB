import React from 'react'
import { Link } from "react-router-dom";

class UnAuthorize extends React.Component{
    render(){
        return(
            <div className="jumbotron jumbotron">
            <div className="container">
              <div className="alert alert-danger" role="alert">
                <span>You are not authorized </span>
                <Link to="/login" className="alert-link">
                  Login
                </Link>
                <span> or </span>
                <Link to="/registration" className="alert-link">
                  Register
                </Link>
              </div>
            </div>
          </div>
        )
    }
}

export default UnAuthorize