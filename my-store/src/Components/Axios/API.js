import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44326/api/",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") }
});
