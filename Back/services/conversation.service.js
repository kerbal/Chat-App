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
          },
          {
            model: Message,
            as: 'ConversationHasMessages',
            attributes: ['createdAt', 'Content', 'UserId'],
            limit: 1,
            order: [['createdAt', 'DESC']],
            required: false
          }
        ],
        order: [['updatedAt', 'DESC']]
      });

      return conversations.map(c => ({
        id: c.id,
        updatedAt: c.updatedAt,
        User1: c.ConversationOfUser1,
        User2: c.ConversationOfUser2,
        LastMessage: c.ConversationHasMessages.length > 0 ? c.ConversationHasMessages[0] : {Content: ""}
      }));
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
      const conversation = await Conversation.findOne({
        where: {
          id: conversationId
        }
      });

      await Message.create({
        ConversationId: conversationId,
        UserId: userId,
        Content: content
      }, {
        transaction: t
      });

      await Conversation.update({
        UserId1: conversation.UserId1
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
      const conversation = await Conversation.findAll({
        where: {
          [Sequelize.Op.or]: [
            {
              UserId1: userId,
            },
            {
              UserId2: userId
            }
          ],
          id: conversationId
        }
      });

      if(conversation) {
        const messages = Message.findAll({
          where: {
            ConversationId: conversationId
          },
          order: [['createdAt', 'ASC']]
        });

        return messages
      }
      else {
        return [];
      }
    }
    catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default ConversationSerivce;