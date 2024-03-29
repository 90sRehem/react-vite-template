import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_URL } from "@/config";
import { IAuthUser, refresh } from "@/features/authentication";
import { useAuthStore } from "@/features/authentication/stores/authStore";

export * from "axios";

let isRefreshing = false;
let failedRequestsQueue: {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}[] = [];

// function getFromStorage(key: string): {
//   data: any;
//   type?: "local" | "session";
// } {
//   const localValues = storage.getItem({ key, storageType: "local" });
//   const sessionValues = storage.getItem({ key, storageType: "session" });

//   if (localValues) {
//     return {
//       data: { ...localValues },
//       type: "local",
//     };
//   }
//   if (sessionValues) {
//     return {
//       data: { ...sessionValues },
//       type: "session",
//     };
//   }

//   return { data: null };
// }

function authRequestInterceptor(config: AxiosRequestConfig) {
  // const storagedValue = getFromStorage("user");
  const { user } = useAuthStore.getState();
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL || "http://localhost:3000/api",
});

axios.interceptors.request.use(authRequestInterceptor, error => {
  Promise.reject(error);
});

axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (error.response?.status === 401) {
      if (error.response.data.error === "token-expired") {
        const originalConfig = error.config;
        const { user, setUser } = useAuthStore.getState();
        // const { data, type } = getFromStorage("user");

        if (!isRefreshing) {
          isRefreshing = true;
          refresh({
            refreshToken: user?.refreshToken as string,
            userId: user?.id as string,
          })
            // axios
            //   .post(EAuthEndpoints.REFRESH_TOKEN, {
            //     refreshToken: user?.refreshToken,
            //     userId: user?.id,
            //   })
            .then(response => {
              const returnedData = response as IAuthUser;
              setUser(returnedData);
              // if (type === "local") {
              //   storage.setItem({
              //     key: "user",
              //     values: returnedData,
              //     storageType: "local",
              //   });
              // } else if (type === "session") {
              //   storage.setItem({
              //     key: "user",
              //     values: returnedData,
              //     storageType: "session",
              //   });
              // }

              axios.defaults.headers.Authorization = `Bearer ${returnedData.token}`;
              failedRequestsQueue.forEach(request =>
                request.onSuccess(returnedData.token as string),
              );
              failedRequestsQueue = [];
            })
            .catch(err => {
              failedRequestsQueue.forEach(request => request.onFailure(err));
              failedRequestsQueue = [];
              setUser(null);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalConfig));
            },
            // eslint-disable-next-line no-shadow
            onFailure: error => {
              reject(error);
            },
          });
        });
      }

      return Promise.reject(new Error("Error with auth token"));
    }
    if (error) {
      // const message = error.response?.data?.message || error.message;
      // useNotificationStore
      //   .getState()
      //   .addNotification({ type: 'error', title: 'Erro', message });
    }
    if (error.code === "ERR_NETWORK") {
    }
    return Promise.reject(error);
  },
);
export * from "axios";
