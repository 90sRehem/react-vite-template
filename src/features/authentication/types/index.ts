export type IAuthCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export interface IAuthResponse {
  data: {
    user: string;
    token: string;
    refreshToken: string;
  };
}

export type IRegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface IAuthUser extends IUser {
  token: string | null;
  refreshToken: string | null;
}

export interface IAuthState {
  status: "idle" | "loading" | "error";
  getAuthUser(): IAuthUser | null;
  authUser: IAuthUser | null;
  setAuthUser(data: IAuthUser | null): void;
  isAuthenticated(): boolean;
  login: (credentials: IAuthCredentials) => Promise<void>;
  logout: () => void;
}

// eslint-disable-next-line no-shadow
export enum EAuthKeys {
  USER = "user",
}

// eslint-disable-next-line no-shadow
export enum EAuthEndpoints {
  LOGIN = "v1/session/login",
  REFRESH_TOKEN = "/v1/session/refresh",
}
