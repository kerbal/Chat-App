import { sequelize, Sequelize } from "../config/sequelize";
import { Conversation, User, Message } from '../models';

class ConversationSerivce {
  static async startConversation (userId1, userId2) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });

    try {
      await Conversation.findOrCreate({
        where: {
          UserId1: userId1,
          UserId2: userId2
        }, 
        transaction: t
      });

      await t.commit();
    }
    catch (error) {
      await t.rollback();
      console.log(error.message);
      return error.message;
    }
  }

  static async getConversations (userId) {
    try {
      const conversations = await Conversation.findAll({
        attributes: ['id', 'updatedAt'],
        where: {
          [Sequelize.Op.or]: [
            {
              UserId1: userId
            }, 
            {
              UserId2: userId
            }
          ]
        },
        include: [
          {
            model: User,
            attributes: ['id', 'Username'],
            as: 'ConversationOfUser1'
          },
          {
            model: User,
            attributes: ['id', 'Username'],
            as: 'ConversationOfUser2'
          }
        ],
        order: [['updatedAt', 'DESC']]
      });

      return conversations;
    }
    catch (error) {
      console.log(error);
      return [];
    }
  }

  static async addMesage (conversationId, userId, content) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });
    try {
      await Message.create({
        ConversationId: conversationId,
        UserId: userId,
        Content: content
      }, {
        transaction: t
      });

      await Conversation.update({
        updatedAt: new Date()
      }, {
        where: {
          id: conversationId
        },
        transaction: t
      });

      await t.commit();
    }
    catch (error) {
      console.log(error);
      await t.rollback();
      return error.message;
    }
  }

  static async getMessages (userId, conversationId) {
    try {
      const messages = await Message.findAll({
        where: {
          [Sequelize.Op.or]: [
            {
              UserId1: userId,
            },
            {
              UserId2: userId
            }
          ],
          ConversationId: conversationId
        },
        order: [['createdAt', 'ASC']]
      });

      return messages;
    }
    catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default ConversationSerivce;