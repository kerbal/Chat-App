import DefaultObject from "./default.object";
import ConversationService from "../services/conversation.service";
import CookieService from "../services/cookie.service";
import io from 'socket.io-client';
import { BASE } from "../config/routes";

class Conversation extends DefaultObject {
  constructor (props) {
    super(props);
    this.Messages = [];
    this.refresh = []
    this.socket = io(BASE);

    this.handleSocket();
  }

  handleSocket () {
    this.socket.emit('connect-user', {
      UserId1: this.User1.id,
      UserId2: this.User2.id
    });
    
    this.socket.on('receive-message', ({message}) => {
      if(message.UserId === CookieService.getInfo('id')) {
        return;
      }
      this.Messages.push(message);
      this.LastMessage = message;
      for(const r of this.refresh) {
        r();
      }
    });
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