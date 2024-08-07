import StatusCodeEnum from '../../utils/enums/StatusCodeEnum';
import ErrorMessageEnum from '../../utils/enums/ErrorMessageEnum';
import * as IAuthService from '../../services/auth/IAuthService';
import UserStore from '../user/user.store';
import bcrypt from 'bcrypt';
import { IError, Response } from '../../utils/interfaces/common';
import jwt from 'jsonwebtoken';
import AuthFunction from '../../utils/common/auth';
import SendResponse from '../../utils/common/response';
import UserEnum from '../../utils/enums/MessageEnum';
import StatusEnum from '../../utils/enums/StatusEnum';
import { REFRESH_TOKEN_EXPIRATION, TOKEN_EXPIRATION } from '../../env';
import IUser from '../user/IUserService';
import { loginSchema } from './auth.validations';
import {
  ILoginSuccess,
  ILoginSuccessData,
} from '../../services/auth/IAuthService';
import { LoggerEnum } from '../../utils/enums/DefaultEnums';
import HelperFunction from '../../utils/common//helper';

const authFun = new AuthFunction(bcrypt, jwt);
const helperFun = new HelperFunction();
export default class AuthService {
  private userStorage = new UserStore();
  constructor() {}

  /**
   * @description Function for login
   * @param request
   * @param response
   * @returns
   */
  public login = async (
    request: IAuthService.IAuthUserRequest,
    response: Response,
  ): Promise<Response> => {
    let data: IError | ILoginSuccess<ILoginSuccessData>;
    try {
      // Validate schema
      const params = await helperFun.validate(loginSchema, request.body);
      if (!params.value) {
        data = {
          statusCode: StatusCodeEnum.BAD_REQUEST,
          message: ErrorMessageEnum.INVALID_REQUEST,
          error: params,
        };
        return SendResponse(response, data, StatusCodeEnum.BAD_REQUEST);
      }
      const { email, password } = params.value;
      const userAttributes = {
        email,
      };
      // Check user email exist or not
      const user: IUser = await this.userStorage.findByAttribute(
        userAttributes,
      );
      if (!user || user.status != StatusEnum.ACTIVE) {
        data = {
          statusCode: StatusCodeEnum.NOT_FOUND,
          message: UserEnum.INVALID_LOGIN,
        };
        return SendResponse(response, data, StatusCodeEnum.NOT_FOUND);
      }
      const userPassword: string = user.password;
      // Check password is valid or not
      const matchPassword: boolean = await authFun.comparePassword(
        password,
        userPassword,
      );
      if (!matchPassword) {
        data = {
          statusCode: StatusCodeEnum.BAD_REQUEST,
          message: UserEnum.WRONG_PASSWORD,
        };
        return SendResponse(response, data, StatusCodeEnum.BAD_REQUEST);
      }

      const tokenReq = {
        id: user.id,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        status: user.status,
        expire: TOKEN_EXPIRATION,
      };

      // Generate JWT Token
      const token: string = await authFun.generateToken(tokenReq);
      // Generate JWT Token for refresh Token
      tokenReq.expire = REFRESH_TOKEN_EXPIRATION;
      const refresh_token: string = await authFun.generateToken(tokenReq);
      data = {
        statusCode: StatusCodeEnum.OK,
        message: UserEnum.LOGIN_SUCCESSFULLY,
        data: {
          token,
          refresh_token,
          user,
        },
      };

      //logging information
      helperFun.log({
        message: data.message,
        location: await helperFun.removeSubstring(__dirname, __filename),
        level: LoggerEnum.INFO,
        error: '',
      });
      return SendResponse(response, data, StatusCodeEnum.OK);
    } catch (e) {
      //logging error
      helperFun.log({
        message: e.message,
        location: await helperFun.removeSubstring(__dirname, __filename),
        level: LoggerEnum.ERROR,
        error: e,
      });
      data = {
        statusCode: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        message: e.message,
        error: e,
      };
      return SendResponse(response, data, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }
  };
}
