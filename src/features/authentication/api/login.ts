import { axios, AxiosRequestConfig } from "@/lib/axios";
import { EAuthEndpoints, IAuthCredentials, IAuthUser } from "../types";

type Credentials = Omit<IAuthCredentials, "rememberMe">;

export async function authenticate({
  email,
  password,
}: Credentials): Promise<IAuthUser | null> {
  const config: AxiosRequestConfig<Credentials> = {
    method: "POST",
    url: EAuthEndpoints.LOGIN,
    data: { email, password },
  };
  const response = await axios(config);

  return response.data.data;
}
