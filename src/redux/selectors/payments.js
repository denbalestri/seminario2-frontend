import get from "lodash/get";

export const getPayments = store => get(store, "payments");
