import { axios, AxiosRequestConfig } from "@/lib/axios";
import { EAuthEndpoints, IAuthUser } from "../types";

interface IRefreshTokenData {
  refreshToken: string;
  userId: string;
}
export async function refresh({
  refreshToken,
  userId,
}: IRefreshTokenData): Promise<IAuthUser | null> {
  const config: AxiosRequestConfig<IRefreshTokenData> = {
    method: "POST",
    url: EAuthEndpoints.REFRESH_TOKEN,
    data: { refreshToken, userId },
  };
  const response = await axios(config);

  return response.data.data;
}
