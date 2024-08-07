import IUser from './IUserService';
import database from '../../config/db';
import { LoggerEnum } from '../../utils/enums/DefaultEnums';
const User = database.users;
import HelperFunction from '../../utils/common/helper';
const helperFun = new HelperFunction();

export default class UserStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      console.log('UserStore', User);
      super('An error occurred while processing the request.');
    }
  };

  /**
   * @description query to get user data and user related data from accounts table
   * @param userId
   * @returns
   */
  public async get(userId: number): Promise<IUser> {
    try {
      return await User.findByPk(userId);
    } catch (e) {
      //logging error
      helperFun.log({
        message: e.message,
        location: await helperFun.removeSubstring(__dirname, __filename),
        level: LoggerEnum.ERROR,
        error: e,
      });
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }
  }

  /**
   * @description Function to fund user bys attribute
   * @param attributes
   * @returns
   */
  public async findByAttribute(attributes: Partial<IUser>): Promise<IUser> {
    try {
      return await User.findOne({ where: attributes });
    } catch (e) {
      //logging error
      helperFun.log({
        message: e.message,
        location: await helperFun.removeSubstring(__dirname, __filename),
        level: LoggerEnum.ERROR,
        error: e,
      });
      return Promise.reject(e.message || e);
    }
  }
}
