const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  user_type: {
    type: DataTypes.ENUM('ordinary', 'corporate', 'admin'),
    defaultValue: 'ordinary',
  },
}, {
  tableName: 'users',
  indexes: [
    { fields: ['email'] },
  ],
});

module.exports = User;
