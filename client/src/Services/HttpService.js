import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400;
  if (expectedError) {
    return Promise.reject(error);
  }
});

export function setHeaders(header, value) {
  axios.defaults.headers.common[header] = value;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setHeaders,
};

export default http;
