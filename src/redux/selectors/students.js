import get from "lodash/get";

export const getStudents = store => get(store, "students");
export const getFilteredStudents = store =>
  get(store, "students").filter(student => {
    const filterForStudent = get(store, "filters.students");
    const filterForStudentKey = Object.keys(filterForStudent)[0];
    if (!filterForStudentKey) return true;

    const filterForStudentValue = filterForStudent[filterForStudentKey];

    return student[filterForStudentKey].includes(filterForStudentValue);
  });
