import api from './../libs/axios';

export const signUp = (data) => {
  return api.post("/users/signUp", data);
};