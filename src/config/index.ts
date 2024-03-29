// export const API_URL = process.env.REACT_APP_API_URL as string;
export const API_URL = import.meta.env.REACT_APP_API_URL as string;
export const JWT_SECRET = import.meta.env.REACT_APP_JWT_SECRET as string;
export const DEV_ENV = import.meta.env.DEV as boolean;
export const FAKE_SERVER = import.meta.env.VITE_FAKE_SERVER || false;
export const storagePrefix = "@-";
