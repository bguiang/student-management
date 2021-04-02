import fetch from "unfetch";

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    //convert non-2xx HTTP responses into errors
    var error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
};

export const getAllStudents = () => fetch("/api/v1/students").then(checkStatus);

// Apparently this syntax "return"s the fetch promise without saying return because it doesnt use braces: () => fetch..
export const addNewStudent = (student) =>
  fetch("api/v1/students", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(student),
  }).then(checkStatus);

export const deleteStudent = (studentId) =>
  fetch(`api/v1/students/${studentId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  }).then(checkStatus);

// For this syntax, "return" has to be specified because it uses the braces: () => {fetch...}
// export const deleteStudent = (studentId) => {
//   return fetch(`api/v1/students/${studentId}`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: "DELETE",
//   });
// };
