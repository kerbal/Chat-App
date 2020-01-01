import React, { useContext, useState } from 'react';
import { ConversationContext } from '../../contexts/conversation.context';
import CookieService from '../../services/cookie.service';
import Messages from './Messages';
import ChatInput from './ChatInput';
import io from 'socket.io-client';

const ChatBox = (props) => {
  const [ refresh, setRefresh ] = useState(false);
  const onRefresh = () => {
    setRefresh(true);
    setRefresh(false);
  }
  
  const { getConversation } = useContext(ConversationContext);
  const conversation = getConversation(props.match.params.id);
  if(!conversation) {
    return <div></div>
  }
  
  const userId = CookieService.getInfo('id');

  return (
    <div className="d-flex flex-column chat-box">
      <div className="p-3 text-center flex-grow-0 shadow-sm">
        <h3>
          {
            conversation.User1.id === userId ? conversation.User2.Username : conversation.User1.Username
          }
        </h3>
      </div>
      <hr className="m-0"/>

      <div className="px-2 flex-grow-1 position-relative">
        {
          !refresh &&
          <Messages conversation={conversation}/>
        }
      </div>
      
      <div className="flex-grow-0">
        <hr className="mt-0"/>
        <ChatInput conversation={conversation} onRefresh={onRefresh}/>
      </div>
    </div>
  )
}

export default ChatBox;