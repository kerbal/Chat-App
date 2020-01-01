import React, { useState, useEffect } from 'react';
import SingleMessage from './SingleMessage';

const Messages = (props) => {
  const [ _conversation, setConversation ] = useState(props.conversation);
  const [ _refresh, setRefresh ] = useState(true);

  const refresh = () => {
    setRefresh(false);
    setRefresh(true);
  }

  useEffect(() => {
    props.conversation.refresh.push(refresh);
  }, []);

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
        _refresh &&
        _conversation.Messages.map(m => (
          <SingleMessage message={m}/>
        ))
      }
    </div>
  )
}

export default Messages;