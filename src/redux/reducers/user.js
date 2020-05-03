/** @format */

import { SET_USER } from "../actions/actionTypes.json";

const initialState = {
  firstName: "Juan",
  lastName: "Perez",
  username: "JuanPerez",
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;

    default:
      return state;
  }
}
