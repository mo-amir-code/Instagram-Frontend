import { httpAxios } from "../../../services/httpAxios";

export const fetchMyUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await httpAxios.get(`/users/myuser?id=${id}`);
      resolve(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      reject(err.response.data);
    }
  });
};

export const fetchUser = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await httpAxios.get(`/users/user?username=${username}`);
      resolve(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      reject(err.response.data);
    }
  });
};

export const fetchFeatureUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await httpAxios.get(`/users/fetch-feature-users`);
      resolve(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      reject(err.response.data);
    }
  });
};

export const updateMyUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await httpAxios.patch(`/users/update-myuser`, data);
      resolve(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      reject(err.response.data);
    }
  });
};
