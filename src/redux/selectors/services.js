import get from "lodash/get";

export const getServices = store => get(store, "services");
