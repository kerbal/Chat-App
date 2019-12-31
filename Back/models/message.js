'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    ConversationId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    Content: DataTypes.TEXT
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.Conversation, {
      as: 'MessageOfConversation',
      foreignKey: 'ConversationId',
      targetKey: 'id'
    });

    Message.belongsTo(models.User, {
      as: 'MessageOfUser',
      foreignKey: 'UserId',
      targetKey: 'id'
    });
  };
  return Message;
};