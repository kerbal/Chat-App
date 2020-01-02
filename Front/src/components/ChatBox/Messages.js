import React, { useState, useEffect } from 'react';
import SingleMessage from './SingleMessage';
import { animateScroll } from 'react-scroll';

const Messages = (props) => {
  const [ _conversation, setConversation ] = useState(props.conversation);
  const [ _refresh, setRefresh ] = useState(true);

  const refresh = () => {
    setRefresh(false);
    setRefresh(true);
    animateScroll.scrollToBottom({containerId: 'messages', smooth: false, duration: 0});
  }

  useEffect(() => {
    props.conversation.refresh.push(refresh);
  }, []);

  useEffect(() => {
    const getConversation = async () => {
      await props.conversation.getMessages();
      setConversation({...props.conversation});
      animateScroll.scrollToBottom({containerId: 'messages', smooth: false, duration: 0});
    }

    getConversation();
  }, [props.conversation]);

  return (
    <div className="messages" id="messages">
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