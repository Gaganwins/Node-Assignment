import { Sequelize, DataTypes } from 'sequelize';
import { DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } from '../env';
import users from '../models/user.sequelize'; // Import the User model
import logger from '../models/logger.sequelize'; // Import the User model

const db: any = {};
initialize();
async function initialize() {
  const sequelize = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    dialectOptions: {},
    port: DB_PORT,
    logging: false,
    pool: {
      max: 10,
      min: 1,
      acquire: 30000,
      idle: 10000,
    },
  });

  // Assign the User model to the db object
  db.users = users(sequelize, DataTypes);
  // Assign the logger model to the db object
  db.logger = logger(sequelize, DataTypes);

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  // sync all models with database
  await sequelize.sync({ alter: true });
}
export default db;
