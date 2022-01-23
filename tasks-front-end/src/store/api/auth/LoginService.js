import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function saveUser(request) {
  return await fetch("http://localhost:8080/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      username: request.username,
      pass: request.password,
      email: request.email,
    }),
  }).then((response) => {
    return response.json();
  });
}

export async function getUser(data) {
  return await axios.post(`${BASE_URL}/auth/signin`, data);
}
