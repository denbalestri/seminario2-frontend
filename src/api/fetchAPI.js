import axios from "axios";
import { BASE_URL } from "../constants/endpoints.json";

export default (url, method, body) => {
  let payload;

  if (method === "POST" || method === "PUT" || method === "PATCH") {
    payload = {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    };
  }

  return fetch(url, {
    method,
    ...payload
  }).then(response => {
    if (response.status >= 300)
      return Promise.reject("Error in connecting to the server!");
    if (method === "DELETE") return Promise.resolve();
    if (response.ok) return response.json();
    return response.json().then(json => {
      throw json;
    });
  });
};

let AuthClient;

const generateAuthClient = token => {
  if (AuthClient) return;
  if (!token) {
    console.error("cannot create an authorized client without a token!");
    return;
  }

  AuthClient = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` }
  });
};

export { AuthClient, generateAuthClient };
