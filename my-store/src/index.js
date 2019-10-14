import ReactDOM from "react-dom";
import React from'react';
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Routes from "./Routing/Routes";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "../src/Reducers/reducers";

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const routing = Routes();

ReactDOM.render(
  <Provider store={store}>{routing}</Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
