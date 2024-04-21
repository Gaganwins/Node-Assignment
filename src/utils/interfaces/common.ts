import IUser from '../../services/user/IUserService';
import { Response } from 'express';

export { Response };
export interface IRequest {
  user: IUser;
}

export interface ISuccess {
  message: string;
  statusCode: number;
}

export interface IError {
  message: string;
  error?: any;
  statusCode: number;
}

export interface ILog {
  message: any;
  location: string;
  level: string;
  error?: any;
}
