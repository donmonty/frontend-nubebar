import client from "./client";

const login = (email, password) => client.post("/api/users/token/", { email, password });

export default {
  login,
};