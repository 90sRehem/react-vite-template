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
  name: string;
  email: string;
}

export interface IAuthUser extends IUser {
  token: string | null;
  refreshToken: string | null;
}

export interface IAuthState {
  status: "idle" | "loading" | "error";
  authUser: IAuthUser | null;
  login: (
    credentials: IAuthCredentials,
    onSuccess: () => void,
  ) => Promise<void>;
  logout: () => void;
}

// eslint-disable-next-line no-shadow
export enum EAuthKeys {
  USER = "user",
}

// eslint-disable-next-line no-shadow
export enum EAuthEndpoints {
  LOGIN = "auth/login",
}
