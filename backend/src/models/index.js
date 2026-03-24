const sequelize = require('../config/database');
const User = require('./User');
const EmailOtp = require('./EmailOtp');
const UserSession = require('./UserSession');
const PlayerProfile = require('./PlayerProfile');
const CorporateProfile = require('./CorporateProfile');
const Tournament = require('./Tournament');

// ─── Associations ────────────────────────────────────────
User.hasMany(UserSession, { foreignKey: 'user_id', as: 'sessions' });
UserSession.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasOne(PlayerProfile, { foreignKey: 'user_id', as: 'player_profile' });
PlayerProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasOne(CorporateProfile, { foreignKey: 'user_id', as: 'corporate_profile' });
CorporateProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Tournament, { foreignKey: 'created_by', as: 'tournaments', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
Tournament.belongsTo(User, { foreignKey: 'created_by', as: 'creator', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });

module.exports = {
  sequelize,
  User,
  EmailOtp,
  UserSession,
  PlayerProfile,
  CorporateProfile,
  Tournament,
};
