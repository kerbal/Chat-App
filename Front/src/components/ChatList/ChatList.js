import React, { useContext, useEffect, useState } from 'react';
import { ConversationContext } from '../../contexts/conversation.context';
import SingleChat from './SingleChat';

const ChatList = (props) => {
  const { conversations } = useContext(ConversationContext);
  const [_conversations, setConversations] = useState([]);

  useEffect(() => {
    setConversations(conversations);
  }, [conversations])

  return (
    <div className="chat-list">
      {
        _conversations.map(c => (
          <SingleChat conversation={c} key={c.id}/>
        ))
      }
    </div>
  )
}

export default ChatList;