import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Welcome</h1>
            <p className="lead">
              You have come to the main page of the future store.
              <br />
              In the future there will be more information. Have a nice day.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
