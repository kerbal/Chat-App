import React from 'react';
import ConversationService from '../services/conversation.service';

export const ConversationContext = React.createContext();

class ConversationProvider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      conversations: [],
      getConversation: this.getConversation
    };
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

  getConversation = (id) => {
    return this.state.conversations.find(c => c.id == id);
  }
}

export default ConversationProvider;