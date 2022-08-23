import { axios, AxiosRequestConfig } from "@/lib/axios";
import { IAuthCredentials, IAuthUser } from "../types";

type Credentials = Omit<IAuthCredentials, "rememberMe">;

export async function authenticate({
  email,
  password,
}: Credentials): Promise<IAuthUser | null> {
  try {
    const config: AxiosRequestConfig<Credentials> = {
      method: "POST",
      url: "auth/login",
      data: { email, password },
    };
    const response = await axios(config);

    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
