const logger = (sequelize, DataTypes) => {
  const logger = sequelize.define(
    'logger',
    {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      level: {
        type: DataTypes.STRING(255),
      },
      message: {
        type: DataTypes.STRING(255),
      },
      location: {
        type: DataTypes.STRING(255),
      },
      meta: {
        type: DataTypes.TEXT,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disable createdAt and updatedAt
      tableName: 'logger',
      hooks: {
        beforeValidate: (instance) => {
          if (!instance.timestamp) {
            instance.timestamp = new Date();
          }
        },
      },
    },
  );
  return logger;
};
export default logger;
