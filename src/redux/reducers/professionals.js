/** @format */

import { SET_PROFESSIONALS } from "../actions/actionTypes.json";

const initialState = {
  professionals: [],
};

export default function professionals(state = initialState, action) {
  switch (action.type) {
    case SET_PROFESSIONALS:
      return action.professionals;

    default:
      return state;
  }
}
