import get from "lodash/get";

export const getUserName = store => get(store, "personalData.name");
export const getUserLastname = store => get(store, "personalData.lastname");
export const getUserEmail = store => get(store, "personalData.email");
export const getUserPhone = store => get(store, "personalData.phone");
export const getUserAddress = store => get(store, "personalData.address");
export const getUserSalary = store => get(store, "personalData.salary");
export const getUserStartDate = store => get(store, "personalData.start_date");
export const getPersonalData = store => get(store, "personalData");
