import React, { Component } from "react";
import "./App.css";
import Routes from "./Routing/Routes";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "../src/Reducers/reducers";

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const routing = Routes();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {routing}
      </Provider>
      
    );
  }
}

export default App;
