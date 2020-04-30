  
import { SET_USER } from "./actionTypes.json";

import { createUser as createUserService } from "../../services/user";

export function setUser(user) {
  return { type: SET_USER, user };
}

export const createUser = user => {
  return () => createUserService(user);
};