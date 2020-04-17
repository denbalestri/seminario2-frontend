import get from "lodash/get";

export const getEmployees = store => get(store, "employees");
export const getFilteredEmployees = store =>
  get(store, "employees").filter(employee => {
    const filterForEmployee = get(store, "filters.employees");
    const filterForEmployeeKey = Object.keys(filterForEmployee)[0];
    if (!filterForEmployeeKey) return true;

    const filterForEmployeeValue = filterForEmployee[filterForEmployeeKey];

    return employee[filterForEmployeeKey].includes(filterForEmployeeValue);
  });
