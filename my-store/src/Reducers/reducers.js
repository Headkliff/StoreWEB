import { combineReducers } from "redux";
import userReducers from "./userReducers";
import counterReducer from "./counterReducer"

const allReducers = combineReducers({
  user: userReducers,
  count: counterReducer
});

export default allReducers;
