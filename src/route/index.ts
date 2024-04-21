import { Application } from 'express';
import UserRoutes from './user.routes';
import { API_VERSION } from '../utils/enums/DefaultEnums';

export default class Routes {
  constructor(app: Application) {
    app.use(API_VERSION.VERSION + '/user', UserRoutes);
  }
}
