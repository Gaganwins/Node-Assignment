const users = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(255),
      },
      last_name: {
        type: DataTypes.STRING(255),
      },
      password: {
        type: DataTypes.STRING(255),
      },
      phone_number: {
        type: DataTypes.STRING(255),
      },
      status: {
        type: DataTypes.STRING(255),
        defaultValue: 'ACTIVE',
      },
    },
    {
      hooks: {
        beforeUpdate: (instance) => {
          instance.updatedAt = new Date();
        },
      },
    },
  );
  return users;
};

export default users;
