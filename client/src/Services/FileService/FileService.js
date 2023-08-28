import http from "../HttpService";
const URL = process.env.REACT_APP_SERVER_URL;

export const uploadFile = async (file) =>
  await http.post(`${URL}/client/upload-file`, file);

export const removeFile = async (id) =>
  await http.delete(`${URL}/client/remove-file/${id}`);
