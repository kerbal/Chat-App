import React from 'react';
import ConversationService from '../services/conversation.service';
import CookieService from '../services/cookie.service';
import { history } from '../App';
import Conversation from '../objects/conversation.object';
import io from 'socket.io-client';
import { BASE } from '../config/routes';

export const ConversationContext = React.createContext();

class ConversationProvider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      conversations: [],
      getConversation: this.getConversation,
      addConversation: this.addConversation
    };

    this.socket = io(BASE);
    this.handleSocket();
  }

  render () {
    return (
      <ConversationContext.Provider value={this.state}>
        {this.props.children}
      </ConversationContext.Provider>
    )
  }

  async componentDidMount ()  {
    const conversations = await ConversationService.getConversations();
    this.setState({
      conversations
    });
  }

  handleSocket = () => {
    this.socket.emit('connect-user-conversation', {
      UserId: CookieService.getInfo('id')
    });
    this.socket.on('receive-conversation', (data) => {
      console.log(data);
      this.setState({
        conversations: [
          new Conversation(data.conversation)
          , ...this.state.conversations]
      });
    });
  }

  getConversation = (id) => {
    return this.state.conversations.find(c => c.id == id);
  }

  addConversation = async ({Username, id}) => {
    const conversation = this.state.conversations.find(c => c.User1.id == id || c.User2.id == id);
    if(conversation) {
      history.push(`/chat/${conversation.id}`);
      return;
    }
    const response = await ConversationService.createConversation(id);
    if(typeof response === 'string') {

    }
    else {
      this.setState({
        conversations: [
          new Conversation(response)
          , ...this.state.conversations]
      });
      history.push(`/chat/${response.id}`);
    }
  }
}

export default ConversationProvider;