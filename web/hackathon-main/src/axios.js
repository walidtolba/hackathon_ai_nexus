import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.40.5.231:8000/",
});

export default instance;
