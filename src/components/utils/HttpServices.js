import axios from "axios";
import constants from "./Constants";

const HttpServices = axios.create({
  baseURL: constants.BACKEND_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default HttpServices;
