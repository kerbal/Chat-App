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
      as: 'UserStartConversations',
      foreignKey: 'UserId1'
    });
    
    User.hasMany(models.Conversation, {
      as: 'UserReceiveConversations',
      foreignKey: 'UserId2'
    });
    
    User.hasMany(models.Message, {
      as: 'UserHasMessages',
      foreignKey: 'UserId'
    });
  };
  return User;
};