import APIService from "./api.service";
import { CONVERSATIONS, MESSAGES, CONVERSATION } from "../config/routes";
import Conversation from "../objects/conversation.object";

class ConversationService {
  static async createConversation (userId) {
    try {
      const response = await new APIService(
        'post',
        CONVERSATION,
        undefined,
        {
          userId2: userId
        },
        true
      ).request();
      return response.conversation;
    }
    catch (error) {
      return APIService.handleError(error);
    }
  }

  static async getConversations () {
    try {
      const response = await new APIService(
        'get',
        CONVERSATIONS,
        undefined,
        undefined,
        true
      ).request();

      return response.conversations.map(c => new Conversation(c));
    }
    catch (error) {
      return [];
    }
  }

  static async getMessages (conversationId) {
    try {
      const response = await new APIService(
        'get',
        MESSAGES,
        {
          id: conversationId
        },
        undefined,
        true
      ).request();

      return response.messages;
    }
    catch (error) {
      return [];
    }
  }

  static async sendMessage (conversationId, content) {
    try {
      await new APIService(
        'post',
        MESSAGES,
        {
          id: conversationId
        },
        {
          content
        },
        true
      ).request();
    }
    catch (error) {
      return APIService.handleError(error);
    }
  }
}

export default ConversationService;