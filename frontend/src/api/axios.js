import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});


// REQUEST INTERCEPTOR
api.interceptors.request.use(

  (config) => {

    const publicRoutes = [
      "/user/register/",
      "/user/token/",
    ];

    const isPublicRoute =
      publicRoutes.includes(
        config.url
      );

    const token =
      localStorage.getItem(
        "access"
      );

    if (
      token &&
      !isPublicRoute
    ) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) =>
    Promise.reject(error)

);


// RESPONSE INTERCEPTOR
api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    // Token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const refresh =
          localStorage.getItem(
            "refresh"
          );

        // Refresh token request
        const response =
          await axios.post(
            "http://127.0.0.1:8000/user/token/refresh/",
            {
              refresh,
            }
          );

        const newAccess =
          response.data.access;

        // Save new access token
        localStorage.setItem(
          "access",
          newAccess
        );

        // Attach new token
        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        // Retry original request
        return api(
          originalRequest
        );

      } catch (refreshError) {

        console.log(
          "Refresh token expired"
        );

        localStorage.clear();

        window.location.href =
          "/";

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);

export default api;