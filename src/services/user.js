import fetchAPI from "../api/fetchAPI";
import { BASE_URL, USER } from "../constants/endpoints.json";

export const createAbsenteeism = absenteeism => {
  const { id, ...payload } = absenteeism;

  return fetchAPI(BASE_URL + USER + `/${id}/absences`, "POST", payload);
};