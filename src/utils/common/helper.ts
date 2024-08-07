import logger from './logger';
import { ILog } from '../interfaces/common';

export default class HelperFunction {
  constructor() {}

  /**
   * @description Common function to log error.
   * @param e
   */
  async log(attr: ILog) {
    const { message, level, error, location } = attr;
    logger[level]({
      message,
      level,
      meta: {
        error: error.stack ? error.stack : error,
      },
      location, //(file location)
    });
  }

  /**
   * @description function to remove substring from string
   * @param subData
   * @param data
   * @returns
   */
  async removeSubstring(subData, data) {
    return data.replace(subData, '');
  }
  /**
   * @description Function to validate schema
   * @param schema
   * @param data
   * @returns
   */
  async validate(schema, data) {
    const param = schema.validate(data, { abortEarly: false });
    if (param.error) {
      return param.error.details;
    }
    return param;
  }
}
