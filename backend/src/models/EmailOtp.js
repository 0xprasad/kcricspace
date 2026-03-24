const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmailOtp = sequelize.define('EmailOtp', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  otp_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  purpose: {
    type: DataTypes.ENUM('signup', 'login', 'verify'),
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  attempts: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
  used_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  last_sent_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'email_otps',
  indexes: [
    { fields: ['email', 'purpose'] },
    { fields: ['expires_at'] },
  ],
});

module.exports = EmailOtp;
