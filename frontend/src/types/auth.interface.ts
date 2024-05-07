export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  roles: string[];
  email: string;
}

export interface IUserWithTokens extends IUser {
  accessToken: string;
  refreshToken: string;
}
