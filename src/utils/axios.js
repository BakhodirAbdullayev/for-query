import axios from "axios";

export const api = axios.create({
  baseURL: "https://reqres.in/api/",
  timeout: 10000,
  // headers: {'X-Custom-Header': 'foobar'}
});
