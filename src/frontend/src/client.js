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
