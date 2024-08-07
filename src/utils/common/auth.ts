import { JWT_SECRET } from '../../env';
import ITokenDetails from '../../services/auth/IAuthService';

export default class AuthFunction {
  public bcrypt;
  public jwt;
  public date: Date;

  constructor(bcrypt: string = '', jwt: string = '') {
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.date = new Date();
  }

  /**
   * @description function to compare password
   * @param password
   * @param userPassword
   * @returns
   */
  async comparePassword(password: string, userPassword: string) {
    try {
      const matchPassword: boolean = await this.bcrypt.compare(
        password,
        userPassword.replace(/^\$2y/, '$2a'),
      );
      return matchPassword;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * @description Function to generate new token
   * @param id
   * @param role
   * @param account_id
   * @param expire
   * @returns
   */
  async generateToken(data: ITokenDetails) {
    try {
      const { expire } = data;
      const secret: string = JWT_SECRET;
      const token: string = await this.jwt.sign(data, secret, {
        expiresIn: expire,
      });
      return token;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * @description Function to hash the password
   * @param password
   * @returns
   */
  async hashPassword(password: string) {
    const hashPw: string = await this.bcrypt.hash(password, 1);
    return hashPw;
  }
}
