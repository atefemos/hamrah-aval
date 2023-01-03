import axios from "axios";
import { Token } from "./helperFunctions";
import Toast from "components/toast/toast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const AccessToken = Token();
    config.headers.Authorization = `Bearer ${AccessToken}`;
    // Do something before request is sent
    return config;
  },
  function (error) {
    // SnackbarUtils.error("hello")
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    // if (
    //   (response.status === 200) &
    //   !pathList.includes(window?.location?.pathname) &
    //   (response.config.method !== "get")
    // ) {
    //   if (response?.data?.code === 200) {
    //     alert(response.data.message);
    //   } else if (response?.data?.code === 403) {
    //     window.location.href = "/auth/login";
    //     alert(response.data.message);
    //   } else {
    //     alert(response.data.message);
    //   }
    // }
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 500 || error.response.status === 0) {
        Toast("خطا در برقراری با سرور");
      } else if (error.response.status === 403) {
        console.log(error.response);
        Toast("email or password is invalid");
        window.location.replace(`/auth/login/`);
      } else {
        Toast(error.response.data.message);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
