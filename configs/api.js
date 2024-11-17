import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// api.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     if (err.response && err.response.status === 400) {
//       return Promise.resolve({ data: [] });
//     }
//     return Promise.reject(err);
//   }
// );
export default api;
