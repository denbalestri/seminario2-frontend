import get from "lodash/get";

export const getHolders = store => get(store, "holders");
export const getFilteredHolders = store =>
  get(store, "holders").filter(holder => {
    const filterForHolder = get(store, "filters.holders");
    const filterForHolderKey = Object.keys(filterForHolder)[0];
    if (!filterForHolderKey) return true;

    const filterForHolderValue = filterForHolder[filterForHolderKey];

    return holder[filterForHolderKey].includes(filterForHolderValue);
  });
