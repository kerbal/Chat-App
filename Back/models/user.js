'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Email: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING,
    Token: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Conversation, {
      as: 'UserHasConversations',
      foreignKey: 'id'
    });

    User.hasMany(models.Message, {
      as: 'UserHasMessages',
      foreignKey: 'id'
    });
  };
  return User;
};