import { LOGIN, LOGOUT } from "../Actions/userActionCreaters";

const initialState = {
  authorized: !!localStorage.getItem("token"),
  nickname: localStorage.getItem("nickname"),
  role : localStorage.getItem('role')
};

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        nickname: action.nickname,
        role : action.role,
        authorized: true
      };
    case LOGOUT:
      return {
        ...state,
        nickname: "",
        role: "",
        authorized: false,
      };

    default:
      return state;
  }
}
