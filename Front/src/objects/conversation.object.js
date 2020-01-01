import DefaultObject from "./default.object";
import ConversationService from "../services/conversation.service";
import CookieService from "../services/cookie.service";

class Conversation extends DefaultObject {
  constructor (props) {
    super(props);
    this.Messages = [];
    setTimeout(() => {
      this.Messages = [];
    }, 5000);
  }

  async getMessages (page) {
    if(this.Messages.length === 0) {
      const messages = await ConversationService.getMessages(this.id);
      this.Messages = [...messages, ...this.Messages];
    }
  }

  async sendMessage (content) {
    const response = await ConversationService.sendMessage(this.id, content);
    if(response) {

    }
    else {
      this.Messages = [...this.Messages, {Content: content, UserId: CookieService.getInfo('id'), ConversationId: this.id }];
    }
  }
}

export default Conversation;