import { SET_USER, LOGOUT_USER } from './actionTypes.json';

export function setUser(user) {
  return { type: SET_USER, user };
}

export function logoutUser() {
  return { type: LOGOUT_USER };
}
