const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tournament = sequelize.define('Tournament', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  tournament_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  created_by: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  sport: {
    type: DataTypes.STRING(50),
    defaultValue: 'Cricket',
  },
  format: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  tournament_type: {
    type: DataTypes.ENUM('league', 'knockout'),
    defaultValue: 'league',
  },
  fixture_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  rules: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  banner_url: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'pending', 'completed'),
    defaultValue: 'draft',
  },
  primary_ground: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  entry_fee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
  prize_pool: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
  max_teams: {
    type: DataTypes.INTEGER,
    defaultValue: 16,
  },
  registration_deadline: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'tournaments',
  timestamps: true,
  underscored: true,
});

module.exports = Tournament;
