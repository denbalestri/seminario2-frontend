/** @format */

import { SET_USER } from "../actions/actionTypes.json";

const initialState = {
  firstName: "Denis",
  lastName: "Balestri",
  username: "dbalestri",
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;

    default:
      return state;
  }
}
