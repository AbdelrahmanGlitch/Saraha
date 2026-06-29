import api from "../libs/axios";
export const signIn = (data) => {
  return api.post("/users/signIn", data);
};