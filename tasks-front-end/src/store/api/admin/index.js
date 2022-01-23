import AxiosInstance from "./../Axios";

export const getCollection = (module, params) => async () => {
  try {
    return await AxiosInstance.get(`${module}`, { params: params });
  } catch (err) {
    throw err;
  }
};

export const getCollectionById = (module, id) => async () => {
  try {
    return await AxiosInstance.get(`${module}/${id}`);
  } catch (err) {
    throw err;
  }
};

export const getCollectionByUser = (module) => async () => {
  try {
    return await AxiosInstance.get(`${module}/user`);
  } catch (err) {
    throw err;
  }
};

export const post = (module, data) => async () => {
  try {
    return await AxiosInstance.post(`${module}`, data);
  } catch (err) {
    throw err;
  }
};

export const remove = (module, id) => async () => {
  try {
    return await AxiosInstance.delete(`${module}/${id}`);
  } catch (err) {
    throw err;
  }
};

export const patch = (module, id, data) => async () => {
  try {
    return await AxiosInstance.patch(`${module}/${id}`, data);
  } catch (err) {
    throw err;
  }
};

export const putApi = (module, data, id) => async () => {
  try {
    return await AxiosInstance.put(`${module}/${id}`, data);
  } catch (err) {
    throw err;
  }
};
