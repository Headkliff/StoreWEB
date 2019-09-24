import React, { Component } from 'react';
import Navibar from './Components/NavBar/Navbar'
import './App.css'


class App extends Component {
  render() {
    return (
      <div>
        <Navibar />
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Fluid jumbotron</h1>
            <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
          </div>
        </div>
      </div>

    );
  }
}

export default App;