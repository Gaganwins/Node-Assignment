import { Request } from 'express';

export interface IRegisterUserRequest extends Request {
  id?: number;
  first_name?: string;
}

export default interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password?: string;
  role: number;
  status: string;
}

export interface IGetUserRequest extends Request {
  id?: number;
  user?: IUser;
}

export interface IGetUserResponse extends Response {
  user?: IUser;
}

export interface IGetUserSuccessData {
  user: IUser;
}

export interface IUserSuccess<T> extends ISuccess {
  data: T;
}

export interface ISuccess {
  message: string;
  statusCode: number;
}
