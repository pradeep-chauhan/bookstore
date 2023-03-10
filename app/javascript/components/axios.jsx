import axios from "axios";

const axiosInstance = axios.create({baseUrl: "http://localhost:3000" || ""});

axiosInstance.interceptors.response.use(
  async (response) => response,
  async error => {
    const {response} = error;
    if(response && response.status === 401) {
      console.log("401 error")
    }
  }
);

export default axiosInstance;
