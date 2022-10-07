import { RouteObject } from "@/lib/react-router-dom";

import { IconType } from "react-icons";

export interface IRoutes extends RouteObject {
  navSize?: string;
  active?: boolean;
  icon?: IconType;
  title?: string;
  description?: string;
  private: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  createdAt: string;
}

type ISuccess<T> = {
  success: boolean;
  message: string;
  data: T;
};

type IAPIError = {
  property: string;
  message: string;
};

type IFailure = {
  success: boolean;
  message: string;
  data: IAPIError[];
};
export type Either<T> = IFailure | ISuccess<T>;

export interface IAPIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface INavItemProps {
  icon: IconType;
  title: string;
  description?: string;
  url: string;
  isOpen?: boolean;
  active?: boolean;
}

export interface INavHoverProps {
  title: string;
  icon: IconType;
  description: string;
}

export interface INavItems {
  items: INavItemProps[];
}
