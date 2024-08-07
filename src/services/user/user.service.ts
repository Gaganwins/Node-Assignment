import StatusCodeEnum from '../../utils/enums/StatusCodeEnum';
import * as IUserService from '../../services/user/IUserService';
import UserStore from './user.store';
import SendResponse from '../../utils/common/response';
import UserEnum from '../../utils/enums/MessageEnum';
import { Response } from '../../utils/interfaces/common';
import IUser, { IUserSuccess, IGetUserSuccessData } from './IUserService';
import { IError } from '../../utils/interfaces/common';
import bcrypt from 'bcrypt';
import HelperFunction from '../../utils/common/helper';
const helperFun = new HelperFunction();
import { LoggerEnum } from '../../utils/enums/DefaultEnums';

export default class UserService {
  private storage = new UserStore();
  constructor() {}

  /**
   *@description Function to get user profile data
   * @param request
   * @param response
   * @returns
   */
  public get = async (
    request: IUserService.IGetUserRequest,
    response: Response,
  ): Promise<Response> => {
    let data: IError | IUserSuccess<IGetUserSuccessData>;
    try {
      const userId: number = parseInt(request.params.id);
      const user: IUser = await this.storage.get(userId);
      if (!user) {
        data = {
          statusCode: StatusCodeEnum.BAD_REQUEST,
          message: UserEnum.USER_NOT_FOUND,
        };
        return SendResponse(response, data, StatusCodeEnum.BAD_REQUEST);
      }
      data = {
        statusCode: StatusCodeEnum.OK,
        message: UserEnum.USER_INFO,
        data: { user },
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
      data = {
        statusCode: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        message: e.message,
        error: e,
      };
      //logging error
      helperFun.log({
        message: e.message,
        location: await helperFun.removeSubstring(__dirname, __filename),
        level: LoggerEnum.ERROR,
        error: e,
      });
      return SendResponse(response, data, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }
  };
}
