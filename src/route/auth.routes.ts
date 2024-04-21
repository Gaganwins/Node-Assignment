import { Router } from 'express';
import AuthService from '../services/auth/auth.service';

class AuthRoutes {
  router = Router();
  public auth = new AuthService();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Login User
    this.router.post('/login', this.auth.login);
  }
}

export default new AuthRoutes().router;
