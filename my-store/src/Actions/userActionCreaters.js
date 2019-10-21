export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export function login(nickname) {
  return {
    type: LOGIN,
    nickname
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
