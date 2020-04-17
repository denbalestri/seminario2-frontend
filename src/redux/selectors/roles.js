import get from "lodash/get";

export const getUserRoles = store => get(store, "roles");
