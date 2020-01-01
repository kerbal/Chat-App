'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    UserId1: DataTypes.INTEGER,
    UserId2: DataTypes.INTEGER
  }, {});
  Conversation.associate = function(models) {
    // associations can be defined here
    Conversation.belongsTo(models.User, {
      as: 'ConversationOfUser1',
      foreignKey: 'UserId1',
      targetKey: 'id'
    });

    Conversation.belongsTo(models.User, {
      as: 'ConversationOfUser2',
      foreignKey: 'UserId2',
      targetKey: 'id'
    });

    Conversation.hasMany(models.Message, {
      as: 'ConversationHasMessages',
      foreignKey: 'ConversationId'
    });
  };
  return Conversation;
};