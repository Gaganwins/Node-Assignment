import express, { Application } from 'express';
import { json } from 'body-parser';
import Routes from './route';
import db from './config/db';
import { API_VERSION } from './utils/enums/DefaultEnums';
import authenticate from './middleware/authenticate';
import AuthRoutes from './route/auth.routes';

export default class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.app.use(express.static('public'));
    this.databaseConnection();
    this.app.use(API_VERSION.VERSION + '/auth', AuthRoutes);
    this.app.use(authenticate);
    new Routes(this.app);

    this.app.get('/', (_, res) => {
      res.status(200).send('Node Server is running');
    });
  }

  private initializeMiddlewares() {
    this.app.use(json());
  }

  private async databaseConnection() {
    db.sequelize
      .authenticate()
      .then(() => {
        console.log('Database Connected Successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
