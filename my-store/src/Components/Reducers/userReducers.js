import { LOGIN, LOGOUT } from "../../Actions/userActionCreaters";

const initialState = {
  authorized: !!localStorage.getItem('token'),
  nickname: localStorage.getItem('nickname')
};

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        nickname: action.nickname,
        authorized: true
      });
    case LOGOUT:
      return Object.assign({}, state, {
        nickname: "",
        authorized: false
      });

    default:
      return state;
  }
}