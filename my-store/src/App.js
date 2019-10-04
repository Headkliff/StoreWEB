import React, { Component } from "react";
import {Container,Jumbotron } from 'react-bootstrap'
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Jumbotron fluid>
          <Container>
            <h1 className="display-4">Welcome</h1>
            <p className="lead">
              You have come to the main page of the store.
              <br />
              In the future there will be more information. Have a nice day.
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
