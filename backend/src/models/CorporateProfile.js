const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CorporateProfile = sequelize.define('CorporateProfile', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true,
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  employee_id: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  designation: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  playing_role: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  batting_style: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  bowling_style: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  avatar_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
}, {
  tableName: 'corporate_profiles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = CorporateProfile;