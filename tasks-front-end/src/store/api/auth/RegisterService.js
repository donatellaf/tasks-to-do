import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function registerUser(data) {
  return await axios.post(`${BASE_URL}/auth/signup`, data);
}
