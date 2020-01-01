import React, { useState, useEffect } from 'react';
import SingleMessage from './SingleMessage';

const Messages = (props) => {
  const [ _conversation, setConversation ] = useState(props.conversation);

  useEffect(() => {
    const getConversation = async () => {
      await props.conversation.getMessages();
      setConversation({...props.conversation});
    }

    getConversation();
  }, [props.conversation]);

  return (
    <div className="messages">
      {
        _conversation.Messages.map(m => (
          <SingleMessage message={m}/>
        ))
      }
    </div>
  )
}

export default Messages;