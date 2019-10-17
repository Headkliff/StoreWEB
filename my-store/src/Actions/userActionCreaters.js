export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export function login(nickname ,role) {
  return {
    type: LOGIN,
    nickname,
    role
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
