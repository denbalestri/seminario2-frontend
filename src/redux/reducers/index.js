/** @format */

import { combineReducers } from "redux";

import user from "../reducers/user";
import professionals from "../reducers/professionals";
export const reducers = combineReducers({
  user,
  professionals,
});
