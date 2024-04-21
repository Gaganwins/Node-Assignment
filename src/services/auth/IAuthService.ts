import { Request } from 'express';
import IUser from '../user/IUserService';
import { ISuccess } from '../../utils/interfaces/common';

export interface IAuthUserRequest extends Request {
  email: string;
  password: string;
}

export interface IAuth {
  email?: string;
  password?: string;
}

export interface ILoginSuccessData {
  user: IUser;
  token: string;
  refresh_token: string;
}

export interface ILoginSuccess<T> extends ISuccess {
  data: T;
}

export default interface ITokenDetails {
  id: number;
  role: number;
  expire: string;
  first_name: string;
  last_name: string;
  status: string;
}
