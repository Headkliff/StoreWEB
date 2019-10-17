import ReactDOM from "react-dom";
import React from'react';
import "./index.css";
import App from "../src/App"
import * as serviceWorker from "./serviceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);

serviceWorker.unregister();
