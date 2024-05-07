import { IUser } from "./auth.interface";

export interface IResponse {
  status: string;
  message: string;
}

export interface ITokensResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
