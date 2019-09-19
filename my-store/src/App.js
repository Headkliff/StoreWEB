import React, { Component } from 'react';
import './App.css'


class App extends Component {
  state = {
    users: [],
    isLoaded: false,
  }

  componentDidMount() {
    fetch('https://localhost:44326/api/user/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });
  }
  render() {
    return (
      <div className='App'>
        <div className='.App__Aside'></div>
        <div className='App__Form'>
          <div className='PageSwitcher'>
            <a href='#' className='PageSwitcher__Item'>Sign In</a>
            <a href='#' className='PageSwitcher__Item PageSwitcher__Item--Active'>Sign Up</a>
          </div>

          <div className='FormTitle'>
            <a href='#' className='FormTitle__Link'>Sign In</a> or <a href='#' className='FormTitle__Link FormTitle__Link--Active'>Sign Up</a>
          </div>
        </div>
      </div>
    );
  }
}
export default App;