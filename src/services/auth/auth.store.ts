import database from '../../config/db';
const User = database.users;

export default class AuthStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      console.log('AuthStore', User);
      super('An error occured while processing the request.');
    }
  };
}
