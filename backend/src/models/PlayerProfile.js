const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlayerProfile = sequelize.define('PlayerProfile', {
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
  full_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
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
  tableName: 'player_profiles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = PlayerProfile;